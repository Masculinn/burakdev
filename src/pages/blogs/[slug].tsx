import Cover from "@/components/blogs/cover";
import Hydrate from "@/components/blogs/hydrate";
import Meta from "@/components/blogs/meta";
import type { BlogType } from "@/interfaces";
import { convertToSlug, getReadingTime } from "@/lib/utils";
import clientService from "@/utils/db";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkAttrsBrackets from "../../../scripts/custom-remark-plugins/remark-attrs";
import remarkUnwrapImageParagraphs from "../../../scripts/custom-remark-plugins/remark-unwrap-image-paragraphs";

const [Recommendation, Newsletter] = await Promise.all([
  dynamic(() => import("@/components/blogs/recommendation"), { ssr: false }),
  dynamic(() => import("@/components/blogs/newsletter"), { ssr: false }),
]);

type GetStaticPropsType = GetStaticProps<
  {
    meta: Omit<BlogType, "content">;
    mdxSource: MDXRemoteSerializeResult;
    blogs: BlogType[];
    readingTime: number;
  },
  { slug: string }
>;

type GetStaticPathsType = GetStaticPaths<{ slug: string }>;

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
}) satisfies GetStaticPathsType;

export const getStaticProps = (async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const { slug } = params;
  const { data, error } = (await clientService()
    .from("blog_posts")
    .select("*")) as { data: BlogType[] | null; error: Error | unknown };

  if (!data || error) {
    throw error;
  }

  const post = data.find(({ title }) => convertToSlug(title) === slug);

  if (!post || !post.content) {
    return {
      notFound: true,
    };
  }

  const { content, ...meta } = post;
  const readingTime = getReadingTime(content.toString());

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkAttrsBrackets,
        remarkUnwrapImageParagraphs,
        remarkGfm,
      ],
      rehypePlugins: [rehypeSlug],
    },
    scope: meta as Omit<BlogType, "content">,
  });

  return {
    props: {
      meta,
      mdxSource,
      blogs: data,
      readingTime: readingTime,
    },
  };
}) satisfies GetStaticPropsType;

export default function Page({
  meta,
  mdxSource,
  blogs,
  readingTime,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta {...meta} />
      <article>
        <Cover {...meta} readingTime={readingTime} />
        <Hydrate {...mdxSource} />
      </article>
      <Newsletter className="mt-12" />
      <Recommendation currentBlogID={meta.id} blogs={blogs} />
    </>
  );
}
