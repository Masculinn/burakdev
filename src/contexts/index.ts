import type {
  BlogSearchContextProps,
  BlogSortContextProps,
  BlogTagsContextProps,
  CarouselContextProps,
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

const CarouselContext = createContext<CarouselContextProps | null>(null);
export { BlogSearchContext, BlogSortContext, BlogTagsContext, CarouselContext };
