import dotenv from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";

const p = path.join(process.cwd(), ".env");

if (existsSync(p)) {
  dotenv.config({ path: p, quiet: true });
  console.log(`✅ Loaded env from ${p}`);
}

import type { BlogType, SlugType } from "@/interfaces";
import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import fspromises from "node:fs/promises";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public");
const RSS_OUT = path.join(OUT_DIR, "rss.xml");
const SITEMAP_OUT = path.join(OUT_DIR, "sitemap.xml");

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

function toRfc822(date: Date): string {
  return date.toUTCString();
}

function createContent({
  description,
  url,
}: Pick<BlogType, "description"> & { url: string }) {
  const desc = `<p>${description}</p>`;
  const link = `<div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div>`;
  return `${desc}${link}`;
}

function createItem(post: BlogType & { slug?: SlugType }) {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("❌ Missing NEXT_PUBLIC_SITE_URL");
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${post.slug}`;
  const publishedDate = new Date(post.published_at);
  const isoDate = publishedDate.toISOString();
  const rfc822Date = toRfc822(publishedDate);

  const rss = `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${rfc822Date}</pubDate>
    <description>${escapeXml(post.description)}</description>
    <content:encoded><![CDATA[${createContent({
      description: post.description,
      url,
    })}]]></content:encoded>
</item>`;

  const sitemap = `<url>
  <loc>${url}</loc>
  <lastmod>${isoDate}</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.5</priority>
</url>`;

  return [rss, sitemap] as const;
}

async function readServerSideData() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  ) {
    console.log(
      "⚠️ Missing database env vars: check either, returning 'null' in 'serverSideSlugs()'",
    );
    throw new Error("Missing database env vars");
  }

  try {
    const dbFile = path.join(ROOT, "src", "utils", "db.ts").replace(/\\/g, "/");
    const slugFile = path.join(ROOT, "src", "generated", "slugs.json");

    const [dbMod, slugMod] = await Promise.all([
      import(`file://${dbFile}`),
      import(`file://${slugFile}`, { with: { type: "json" } }),
    ]);

    const db = (dbMod.default ?? dbMod) as () => SupabaseClient;
    const slugs: SlugType[] = slugMod.default ?? slugMod;

    const { data: posts, error } = (await db()
      .from("blog_posts")
      .select("*")
      .order("published_at", {
        ascending: false,
      })) as {
      data: BlogType[] | null;
      error: PostgrestError | null;
    };

    if (error || !posts) {
      throw new Error(
        `Error getting server side data: code: ${error?.code}, message: ${error?.message}`,
      );
    }

    if (!slugs) {
      throw new Error(`❌ Error getting generated slugs`);
    }

    const postsWithSlugs = posts.map((post) => {
      const matched = slugs.find((s) => s.title === post.title)?.url;
      if (!matched) throw new Error(`Missing slug for ${post.title}`);
      return { ...post, slug: matched as unknown as SlugType };
    });

    return postsWithSlugs;
  } catch (err) {
    console.error("❌ Error getting server side data:", err);
    throw err;
  }
}

async function main() {
  const posts = await readServerSideData();
  const items = posts.map(createItem);
  const rssItems = items.map(([rss]) => rss);
  const sitemapItems = items.map(([, sitemap]) => sitemap);

  const mergeRssItems = rssItems.length ? rssItems.join("\n") : "";
  const mergeSitemapItems = sitemapItems.length ? sitemapItems.join("\n") : "";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>justc0de_sessions RSS feed by Burak Bilen</title>
        <link>${process.env.NEXT_PUBLIC_SITE_URL}/blogs</link>
        <atom:link href="${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        <description>Stay up to date with my latest blog posts</description>
        <language>en-us</language>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <copyright>Copyright ${new Date().getFullYear()}, justc0de_sessions author Burak Bilen</copyright>
        <lastBuildDate>${toRfc822(new Date())}</lastBuildDate>
          ${mergeRssItems}
    </channel>
</rss>`;

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://burakdev.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://burakdev.com/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${mergeSitemapItems}
</urlset>`;

  await fspromises.writeFile(SITEMAP_OUT, sitemap, "utf8");
  console.log("✅ sitemap.xml written to public/sitemap.xml");
  await fspromises.writeFile(RSS_OUT, rss, "utf8");
  console.log("✅ rss.xml written to public/rss.xml");
}

main().catch((err) => {
  console.error("❌ Fatal during rss generation:", err);
  process.exit(1);
});
