import Banner from "@/components/blogs/banner";
import BlogFilter from "@/components/blogs/filter";
import BlogPosts from "@/components/blogs/posts";
import { BLOG_CONTEXT } from "@/constants/ctx.config";
import type { BlogType, Tag } from "@/interfaces";
import BlogPostProvider from "@/providers/blog-post-provider";
import clientService from "@/utils/db";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

type PageProps = {
  posts: BlogType[];
  tags: Tag[];
};

const fallback = {
  props: { posts: [], tags: BLOG_CONTEXT.tags } as PageProps,
};

export const getStaticProps = (async () => {
  try {
    const { data, error } = (await clientService()
      .from("blog_posts")
      .select("*")) as { data: BlogType[] | null; error: unknown };

    if (error) throw error;
    if (data && data.length > 0) {
      const uniqueTags = new Set(
        data.flatMap(({ tags }) => tags).filter(Boolean),
      ) as unknown as Tag[];
      return {
        props: { posts: data, tags: ["all", ...uniqueTags] },
      };
    }
    return fallback;
  } catch (error) {
    console.error(`Error fetching blog posts: ${error}`);
    return fallback;
  }
}) satisfies GetStaticProps<PageProps>;

export default function BlogsPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>justc0de_sessions</title>
        <meta
          name="description"
          content="justc0de_sessions is a collection of my blog posts where I share my programming knowledge with practical examples and insights — widely."
        />
        <meta name="og:title" content="justc0de_sessions" />
        <meta
          name="og:description"
          content="justc0de_sessions is a collection of my blog posts where I share my programming knowledge with practical examples and insights — widely."
        />
      </Head>
      <section>
        <Banner />
        <BlogPostProvider initialTags={tags}>
          <BlogFilter />
          <BlogPosts posts={posts} />
        </BlogPostProvider>
      </section>
    </>
  );
}
