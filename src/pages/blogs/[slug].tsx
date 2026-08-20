import Cover from "@/components/blogs/cover";
import { MDXComponents } from "@/components/blogs/mdx-components";
import Meta from "@/components/blogs/meta";
import type { BlogType } from "@/interfaces";
import { convertToSlug } from "@/utils/convertToSlug";
import clientService from "@/utils/db";
import type {
  InferGetStaticPropsType,
  GetStaticPaths as NextGetStaticPaths,
  GetStaticProps as NextGetStaticProps,
} from "next";
import { MDXClient } from "next-mdx-remote-client";
import type { SerializeResult } from "next-mdx-remote-client/serialize";
import { serialize } from "next-mdx-remote-client/serialize";
import dynamic from "next/dynamic";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkAttrsBrackets from "../../../scripts/custom-remark-plugins/remark-attrs";
import remarkUnwrapImageParagraphs from "../../../scripts/custom-remark-plugins/remark-unwrap-image-paragraphs";

type MetaProps = Omit<BlogType, "content">;
type Scope = Record<string, unknown>;

interface GetStaticProps
  extends NextGetStaticProps<{
    meta: MetaProps;
    mdxSource: SerializeResult<Record<string, unknown>, Scope>;
    blogs: BlogType[];
    readingTime: number;
  }> {}

interface GetStaticPaths extends NextGetStaticPaths<{ slug: string }> {}

const [Recommendation, Newsletter, SessionOver] = await Promise.all([
  dynamic(() => import("@/components/blogs/recommendation"), { ssr: false }),
  dynamic(() => import("@/components/blogs/newsletter"), { ssr: false }),
  dynamic(() => import("@/components/blogs/session-over"), { ssr: false }),
]);

export const getStaticProps = (async ({ params }) => {
  if (!params) return { notFound: true };
  const { slug } = params;

  const { data, error } = (await clientService()
    .from("blog_posts")
    .select("*")) as { data: BlogType[] | null; error: Error | unknown };

  if (!data || error) throw error;

  const post = data.find(({ title }) => convertToSlug(title) === slug);
  if (!post?.content) return { notFound: true };

  const { content, ...meta } = post;
  const readingTime = getReadingTime(content.toString());

  const mdxSource = await serialize<Record<string, unknown>, Scope>({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [
          remarkAttrsBrackets,
          remarkUnwrapImageParagraphs,
          remarkGfm,
        ],
        rehypePlugins: [rehypeSlug],
      },
      scope: meta as unknown as Scope,
    },
  });

  return {
    props: {
      meta,
      mdxSource,
      blogs: data,
      readingTime,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const { data, error } = (await clientService()
    .from("blog_posts")
    .select("title")) as {
    data: Array<{ title: string }> | null;
    error: unknown;
  };

  if (!data || error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const slugs = data.map(({ title }) => ({
    params: { slug: convertToSlug(title) } as { slug: string },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default function Page({
  meta,
  mdxSource,
  blogs,
  readingTime,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if ("error" in mdxSource) {
    return <pre>{JSON.stringify(mdxSource.error, null, 2)}</pre>;
  }

  return (
    <>
      <Meta {...meta} />
      <article className="leading-snug text-blog-muted tracking-tight container laptop:px-16 desktop:px-0">
        <Cover {...meta} readingTime={readingTime} />
        <MDXClient
          frontmatter={mdxSource.frontmatter}
          compiledSource={mdxSource.compiledSource}
          components={MDXComponents}
          scope={meta}
        />
      </article>
      <SessionOver sessionId={meta.id} />
      <Newsletter className="mt-12" />
      <Recommendation currentBlogID={meta.id} blogs={blogs} />
    </>
  );
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const imageSeconds = 12;

  const raw = (content ?? "").toString();
  if (!raw.trim()) return 0;

  const countImages = (input: string) => {
    const imgHtml = (input.match(/<img\b[^>]*>/gi) || []).length;
    const mdImgs = (input.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
    return imgHtml + mdImgs;
  };

  const images = countImages(raw);

  const stripMarkdownAndHtml = (input: string) => {
    let s = input;

    s = s.replace(/^\s*---[\s\S]*?---\s*/m, "");

    s = s.replace(/```[\s\S]*?```/g, " ");
    s = s.replace(/~~~[\s\S]*?~~~/g, " ");

    s = s.replace(/`[^`]*`/g, " ");

    s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ");
    s = s.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ");
    s = s.replace(/<!--[\s\S]*?-->/g, " ");

    s = s.replace(/!\[([^\]]*)\]\((?:[^)]+)\)/g, (_, alt) =>
      alt ? `${alt} ` : " ",
    );

    s = s.replace(
      /<img\b[^>]*\salt=(?:'([^']*)'|"([^"]*)"|([^\s>]+))[^>]*>/gi,
      (_, a1, a2, a3) => {
        const alt = a1 ?? a2 ?? a3 ?? "";
        return alt ? `${alt} ` : " ";
      },
    );

    s = s.replace(/<img\b[^>]*>/gi, " ");

    s = s.replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, (_, text) =>
      text ? `${text} ` : " ",
    );

    s = s.replace(/\[([^\]]+)\]\s*\[[^\]]*\]/g, (_, text) =>
      text ? `${text} ` : " ",
    );

    s = s.replace(/^[ \t]*\[[^\]]+\]:.*$/gm, " ");

    s = s.replace(/^[ \t]*[#>*+-]+[ \t]*/gm, " ");

    s = s.replace(/[*_~]{1,3}/g, " ");

    s = s.replace(/<[^>]+>/g, " ");

    s = s.replace(/\s+/g, " ").trim();

    return s;
  };

  const countWords = (text: string) => {
    if (!text) return 0;

    const matches = text.match(/[\p{L}\p{N}]+(?:['’\-\u2019][\p{L}\p{N}]+)*/gu);
    return matches ? matches.length : 0;
  };

  const cleaned = stripMarkdownAndHtml(raw);
  const words = countWords(cleaned);
  const secondsFromWords = (words / wordsPerMinute) * 60;
  const totalSeconds = Math.max(
    0,
    Math.round(secondsFromWords + images * imageSeconds),
  );
  const minutes = totalSeconds / 60;
  return Math.ceil(minutes);
}
