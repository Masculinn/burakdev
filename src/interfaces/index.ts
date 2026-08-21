import type { IconName } from "@/lib/getIcon";
import type { MotionTextProps } from "@/motion/types";
import type useEmblaCarousel from "embla-carousel-react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { ComponentType, JSX, SetStateAction, SVGProps } from "react";

/** interfaces */

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}
export interface ThemeProps {
  theme: ThemeType;
}
export interface TextAnimatorProps extends Pick<
  MotionTextProps,
  "config" | "animation" | "children"
> {
  elementType?: React.ElementType;
  className?: string;
}
export interface TimelineItem {
  title: string;
  content: TimelineContentItem;
}
export interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export interface BlogType {
  id: number;
  title: string;
  tags: Tag[];
  description: string;
  banner_image: string;
  content?: string;
  published_at: string;
  level: number;
}

export interface SlugType {
  url: string;
  title: string;
}

/** types */

export type Tag = string;
export type ThemeType = "light" | "dark";
export type ProjectStatus = "ongoing" | "done" | "paused";
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export type IconProps = SVGProps<SVGSVGElement>;
export type BlogPostSortProps = "old-to-new" | "new-to-old" | "a-z" | "z-a";
export type HTMLAttributes<T> = React.HTMLAttributes<T>;
export type NavItem = {
  title: string;
  url: string;
  icon?: IconComponent;
  iconProps?: SVGProps<SVGSVGElement>;
  isActive?: boolean;
  items?: NavItem[];
};

export type NavBasicType = {
  title: string;
  url: string;
  icon: IconComponent;
  iconProps?: SVGProps<SVGSVGElement>;
};

export type TimelineContentItem = {
  id: number;
  status: ProjectStatus;
  title: string;
  techs: readonly IconName[];
  desc: string;
  gitLink?: string;
  images: string[];
};

export type SetStateProps<T> = React.Dispatch<SetStateAction<T>>;

/** ========= carousel ========= */
export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
/** ============================ */

// mdx

type IntrinsicComponentMap = {
  [K in keyof JSX.IntrinsicElements]?: React.ComponentType<
    JSX.IntrinsicElements[K]
  >;
};
export type MDXComponentsMap = IntrinsicComponentMap &
  Record<string, ComponentType>;

/** Contexts */

export interface BlogSearchContextProps {
  search: string;
  setSearch: SetStateProps<string>;
}
export interface BlogSortContextProps {
  sort: BlogPostSortProps;
  setSort: SetStateProps<BlogPostSortProps>;
}
export interface BlogTagsContextProps {
  initialTags: Tag[];
  setSelectedTags: SetStateProps<Tag[]>;
  selectedTags: Tag[];
}
export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;
