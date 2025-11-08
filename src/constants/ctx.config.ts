import type { BlogPostSortProps, BlogTagsContextProps } from "@/interfaces";

const BLOG_CONTEXT = {
  tags: ["all"] as unknown as BlogTagsContextProps["initialTags"],
  sort: "new-to-old" as BlogPostSortProps,
};

export { BLOG_CONTEXT };
