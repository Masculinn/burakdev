import type { BlogType } from "@/interfaces";
import { getDate } from "@/lib/utils";
import Head from "next/head";

type MetaProps = Pick<
  BlogType,
  "title" | "description" | "tags" | "banner_image" | "published_at"
>;

export default function Meta({
  description,
  banner_image,
  published_at,
  tags,
  title,
}: MetaProps) {
  return (
    <Head>
      <title>{`justc0de_sessions | ${title}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="burakdev" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={banner_image} />
      <meta
        property="article:published_time"
        content={getDate(published_at).toISOString()}
      />
      <meta property="article:tag" content={tags.join(",")} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={banner_image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="article:author" content="Burak Bilen" />
      <meta name="author" content="Burak Bilen" />
    </Head>
  );
}
