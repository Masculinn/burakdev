import { db } from "@/db";
import Head from "next/head";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Hydrate from "@/components/Blog/hydrate";
import { serialize } from "next-mdx-remote/serialize";
import { BlogPageProps } from "@/interfaces";
import { Subscribe } from "@/components/Blog/Subscribe";
import Reccomendation from "@/components/Blog/reccomendation";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const BlogPage: NextPage<BlogPageProps> = ({ source, frontMatter }) => {
  const publishedDate = new Date(frontMatter.published_at).toLocaleDateString();

  return (
    <>
      <Head>
        <title>{`Burak Bilen | ${frontMatter.title}`}</title>
        <meta
          name="description"
          content={`Read ${frontMatter.title} published on ${frontMatter.published_at}.`}
        />
        <meta property="og:title" content={frontMatter.title} />
        <meta
          property="og:description"
          content={`Read ${frontMatter.title} published on ${publishedDate}.`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={frontMatter.banner_image} />
        <meta
          property="og:url"
          content={`https://burakdev.com/blogs/${frontMatter.slug}`}
        />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <main>
        <Image
          alt={`burakdev | ${frontMatter.title}`}
          src={`${frontMatter.banner_image}`}
          height={900}
          className="sr-only"
          width={1200}
        />
        <Hydrate frontMatter={frontMatter} source={source} />
      </main>
      <Subscribe />
      <Reccomendation id={frontMatter.id} />
    </>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await db.from("blog_posts").select("slug");

  if (error) {
    console.error("Error fetching data:", error);
    return { paths: [], fallback: false };
  }

  const paths = data.map((post: { slug: string }) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const { data, error } = await db
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }

  const mdxSource = await serialize(data.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        tags: data.tags,
        banner_image: data.banner_image,
        description: data.description,
        published_at: data.published_at,
        level: data.level,
      },
    },
  };
};
