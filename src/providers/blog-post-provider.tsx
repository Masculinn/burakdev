import { BLOG_CONTEXT } from "@/constants/ctx.config";
import {
  BlogSearchContext,
  BlogSortContext,
  BlogTagsContext,
} from "@/contexts";
import type {
  BlogPostSortProps,
  BlogSearchContextProps,
  BlogSortContextProps,
  BlogTagsContextProps,
  Tag,
} from "@/interfaces";
import { useMemo, useState } from "react";

type ProviderProps = {
  children: React.ReactNode;
  initialTags: Tag[];
};

export default function BlogPostProvider({
  children,
  initialTags,
}: ProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<BlogPostSortProps>(BLOG_CONTEXT.sort);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(BLOG_CONTEXT.tags);

  const searchValue = useMemo<BlogSearchContextProps>(
    () => ({ search, setSearch }),
    [search],
  );
  const sortValue = useMemo<BlogSortContextProps>(
    () => ({ sort, setSort }),
    [sort],
  );
  const tagsValue = useMemo<BlogTagsContextProps>(
    () => ({ initialTags, selectedTags, setSelectedTags }),
    [selectedTags, initialTags],
  );

  return (
    <BlogSearchContext.Provider value={searchValue}>
      <BlogSortContext.Provider value={sortValue}>
        <BlogTagsContext.Provider value={tagsValue}>
          {children}
        </BlogTagsContext.Provider>
      </BlogSortContext.Provider>
    </BlogSearchContext.Provider>
  );
}
