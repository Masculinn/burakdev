import type { BlogPostSortProps, BlogTagsContextProps } from "@/interfaces";

export default {
  tags: ["all"] as unknown as BlogTagsContextProps["initialTags"],
  sort: "new-to-old" as BlogPostSortProps,
} as const;
