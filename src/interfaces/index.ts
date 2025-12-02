/** interfaces */

import type { IconName } from "@/lib/getIcon";
import type { MotionTextProps } from "@/motion/types";
import type { ComponentType, JSX, SetStateAction, SVGProps } from "react";

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}
export interface ThemeProps {
  theme: ThemeType;
}
export interface TextAnimatorProps
  extends Pick<MotionTextProps, "config" | "animation" | "children"> {
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
  status: ProjectStatus;
  role: string;
  title: string;
  techs: readonly IconName[];
  desc: string;
  gitLink?: string;
  plainLink?: string;
  images: string[];
};

export type SetStateProps<T> = React.Dispatch<SetStateAction<T>>;

// mdx

type IntrinsicComponentMap = {
  [K in keyof JSX.IntrinsicElements]?: React.ComponentType<
    JSX.IntrinsicElements[K]
  >;
};
export type MDXComponentsMap = IntrinsicComponentMap & {
  [custom: string]: React.ComponentType;
};

/* Cookie Consents */

export type ConsentCategories = "necessary" | "analytics";
export type ConsentState = {
  necessary: true;
  analytics: boolean;
};

export type ConsentRecord = {
  version: number;
  consents: ConsentState;
  timestamp: string;
  source?: string;
};

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

export interface CookieContextValue {
  consent: ConsentState | null;
  setConsent: (
    c: Partial<Omit<ConsentState, "necessary">> & { source?: string }
  ) => void;
  has: (category: ConsentCategories) => boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  resolved: boolean;
}
