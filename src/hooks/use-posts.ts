import {
  BlogSearchContext,
  BlogSortContext,
  BlogTagsContext,
} from "@/contexts";
import { useContext } from "react";

const useBlogSearch = () => {
  const ctx = useContext(BlogSearchContext);
  if (!ctx)
    throw new Error("useBlogPost must be used within a BlogPostProvider.");

  return ctx;
};

const useBlogSort = () => {
  const ctx = useContext(BlogSortContext);
  if (!ctx)
    throw new Error("useBlogPost must be used within a BlogPostProvider.");

  return ctx;
};

const useBlogTags = () => {
  const ctx = useContext(BlogTagsContext);
  if (!ctx)
    throw new Error("useBlogPost must be used within a BlogPostProvider.");

  return ctx;
};

export { useBlogSearch, useBlogSort, useBlogTags };
