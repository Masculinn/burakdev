import { BLOG_CONTEXT } from "@/constants/ctx.config";
import {
  BlogSearchContext,
  BlogSortContext,
  BlogTagsContext,
} from "@/contexts";
import type { BlogPostSortProps, Tag } from "@/interfaces";
import { useState } from "react";

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

  return (
    <BlogSearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      <BlogSortContext.Provider
        value={{
          sort,
          setSort,
        }}
      >
        <BlogTagsContext.Provider
          value={{
            initialTags,
            selectedTags,
            setSelectedTags,
          }}
        >
          {children}
        </BlogTagsContext.Provider>
      </BlogSortContext.Provider>
    </BlogSearchContext.Provider>
  );
}
