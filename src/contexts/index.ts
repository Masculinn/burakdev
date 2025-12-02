import type {
  BlogSearchContextProps,
  BlogSortContextProps,
  BlogTagsContextProps,
  CookieContextValue,
} from "@/interfaces";
import { createContext } from "react";

const BlogSearchContext = createContext<BlogSearchContextProps | undefined>(
  undefined
);
const BlogSortContext = createContext<BlogSortContextProps | undefined>(
  undefined
);
const BlogTagsContext = createContext<BlogTagsContextProps | undefined>(
  undefined
);
const CookieContext = createContext<CookieContextValue | undefined>(undefined);

export { BlogSearchContext, BlogSortContext, BlogTagsContext, CookieContext };
