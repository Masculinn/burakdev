import type { IconName } from "@/lib/getIcon";
import type { ComponentType, JSX, SetStateAction, SVGProps } from "react";

/** interfaces */

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
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export type IconProps = SVGProps<SVGSVGElement>;
export type BlogPostSortProps = "old-to-new" | "new-to-old" | "a-z" | "z-a";
export type HTMLAttributes<T> = React.HTMLAttributes<T>;

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

type SetStateProps<T> = React.Dispatch<SetStateAction<T>>;

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
