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
const OUT_FILE = path.join(OUT_DIR, "rss.xml");

function escapeCdata(str = "") {
  return str.replace(/]]>/g, "]]]]><![CDATA[>");
}

function createItem(post: BlogType & { slug?: SlugType }) {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("❌ Missing NEXT_PUBLIC_SITE_URL");
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${post.slug}`;
  const date = new Date(post.published_at).toUTCString();

  return `<item>
    <title>${post.title}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${date}</pubDate>
    <description>${post.description}</description>
    <content:encoded><![CDATA[${escapeCdata(post.content)}]]></content:encoded>
</item>`;
}

async function readServerSideData() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.log(
      "⚠️ Missing database env vars: check either NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY, returning 'null' in 'serverSideSlugs()'",
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
  const items = posts.map(createItem).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Your Blog Title</title>
        <link>${process.env.NEXT_PUBLIC_SITE_URL}</link>
        <description>Your blog description</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
    </channel>
</rss>`;

  await fspromises.writeFile(OUT_FILE, rss, "utf8");

  console.log("✅ rss.xml written to public/rss.xml");
}

main().catch((err) => {
  console.error("❌ Fatal during rss generation:", err);
  process.exit(1);
});
