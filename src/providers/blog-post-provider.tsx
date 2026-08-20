import CONTEXT from "@/constants/blog.config";
import {
  BlogSearchContext,
  BlogSortContext,
  BlogTagsContext,
} from "@/contexts";
import type { BlogPostSortProps, Tag } from "@/interfaces";
import { useState } from "react";
import { composeProviders } from ".";

export default function BlogPostProvider({
  children,
  initialTags,
}: {
  children: React.ReactNode;
  initialTags: Tag[];
}) {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<BlogPostSortProps>(CONTEXT.sort);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(CONTEXT.tags);

  const _search = {
    search,
    setSearch,
  };

  const _sort = {
    sort,
    setSort,
  };

  const _tags = {
    initialTags,
    selectedTags,
    setSelectedTags,
  };
  return composeProviders(
    [
      [BlogSearchContext, _search, "search-provider"],
      [BlogSortContext, _sort, "sort-provider"],
      [BlogTagsContext, _tags, "tags-provider"],
    ],
    children,
  );
}
