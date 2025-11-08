import type {
  BlogSearchContextProps,
  BlogSortContextProps,
  BlogTagsContextProps,
} from "@/interfaces";
import { createContext } from "react";

const BlogSearchContext = createContext<BlogSearchContextProps | undefined>(
  undefined,
);
const BlogSortContext = createContext<BlogSortContextProps | undefined>(
  undefined,
);
const BlogTagsContext = createContext<BlogTagsContextProps | undefined>(
  undefined,
);

export { BlogSearchContext, BlogSortContext, BlogTagsContext };
