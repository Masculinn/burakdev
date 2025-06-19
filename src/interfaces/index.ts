/**
 * @fileoverview Interfaces
 * Starting from app level
 *
 * -> Database Types
 * -> Redux Types
 * -> Sidebar Type
 * -> Component Types
 * -> Custom Hooks Types
 */

import {
  AnimationKeys,
  DelayLogic,
  ImageMotionCASProps,
  ImageMotionFnTypes,
  TransitionKeys,
  ViewAnimationControllerProps,
} from "@/components/MotionProvider/types";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

/* --------- Database Types --------- */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  level: number;
  content: string;
  tags: string[];
  like: number;
  view: number;
  banner_image: string;
  description: string;
  published_at: string;
}

export interface BlogPageProps {
  source: MDXRemoteSerializeResult;

  frontMatter: Omit<BlogPost, "content">;
}
/* --------- Database Types End --------- */

/* --------- Redux Types --------- */

export type ReduxThemeProps = "light" | "dark";
export type ReduxSidebarProps = boolean;
export interface ReduxCookieProps {
  trigger: boolean;
}
export interface ReduxBlogProps {}
/* --------- Redux Types End --------- */

/* --------- Sidebar Type --------- */

export interface SidebarUserProps {
  name: string;
  email: string;
  avatar: string;
  [key: string]: any;
}

export interface SidebarTeamProps {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export interface SidebarNavMainItemProps {
  title: string;
  url: string;
}
export interface SidebarSocialItemProps {
  title: string;
  url: string;
  icon: React.ElementType;
}

export interface SidebarNavMainProps {
  items?: SidebarNavMainItemProps[];
  title: string;
  url?: string;
  icon?: React.ElementType;
  isActive?: boolean;
}
export interface SidebarProjectItem {
  name: string;
  url: string;
  title: string;
  complexity: "easy" | "medium" | "hard";
  image: string;
  icon: React.ElementType;
}

export interface SidebarProps {
  user: SidebarUserProps;
  navMain: SidebarNavMainProps[];
  blogs: SidebarNavMainProps[];
  projects: SidebarProjectItem[];
  socials: SidebarSocialItemProps[];
  motionProvider: SidebarNavMainProps[];
  [key: string]: any;
}

export type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

/* --------- Sidebar Type Ends --------- */

/* --------- Component Types --------- */

export interface AppContainterProps {
  children: React.ReactNode;
}
export interface ThemeSwitcherButtonProps {
  theme: ReduxThemeProps;
  onChange: (checked: boolean) => void;
  classname?: string;
}
export interface TimelineEntryProps {
  title: string;
  content: TimelineItemProps;
}
export interface TimelineItemProps {
  status: "ongoing" | "done" | "paused";
  title: string;
  role: string;
  desc?: string;
  images: string[];
  link?: string;
  githubLink?: string;
  usedTechs: string[];
  output: string;
}
export interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  [key: string]: any;
}
export interface ZoomableImageProps {
  height: number;
  width: number;
  src: string;
  alt: string;
  className?: string;
}
export interface PingProps {
  mode: "success" | "error" | "warning";
  isAnimated?: boolean;
  size: "sm" | "md" | "lg";
  className?: string;
  [key: string]: any;
}

export interface ComponentLibraryCardProps
  extends ComponentLibraryCardBodyProps {
  name: string;
  description: string;
  link: string;
  techs: string[];
  frameworks: string[];
  image: string;
  alt: string;
  level: ComponentLevels;
}
export interface ComponentLibraryCardBodyProps {
  name: string;
  description: string;
  link: string;
  level: ComponentLevels;
  className?: string;
  techs: string[];
}
export interface ComponentLibraryIntroProps {
  title: string;
  description: string;
  wrapperClassName?: string;
}
export interface ComponentBannerCardProps {
  title: string;
  theme: ReduxThemeProps;
  animations?: AnimationKeys[];
  transition?: TransitionKeys;
  delayLogic?: DelayLogic;
  controlConfig?: ImageMotionCASProps;
  imageAnimationDuration?: number;
  duration?: number;
  src?: string;
  delayed?: number;
  description: string;
  className?: string;
}
export interface DocumentationProps {
  [key: string]: DocumentationObjProps;
}
export interface DocumentationObjProps {
  code: string;
  desc?: string;
}
export interface CodeProviderProps {
  lang?: string;
  appTheme?: ReduxThemeProps;
  fontSize?: "md" | "sm";
  desc?: string;
  title?: string;
  wrapperStyle?: string;
  code: string;
  showLineNumbers?: boolean;
  bordered?: boolean;
  reverseTheme?: boolean;
  rounded?: boolean;
}
export interface MotionViewerProps {
  code: string;
  provider: "ViewAnimationContainer" | "MotionQueue";
  children: React.ReactNode;
  elementType?: React.ElementType;
  desc?: string;
  animation: AnimationKeys[];
  transition?: TransitionKeys;
}
export interface OverviewCardProps {
  title: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}
export interface ExamplesCardProps extends ViewAnimationControllerProps {
  code: string;
  desc: string;
}
export interface CodeBadgeProps {
  code?: string;
  children?: React.ReactNode;
}
export interface PerformanceCardDataProps {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}
export interface ImageMotionEnginePresetProps {
  style: string;
  name: ImageMotionEnginePresetTypes;
}
export interface StepsCardProps {
  data: StepCardDataProps[];
}
export interface StepCardDataProps {
  title: string;
  desc: React.ReactNode;
}
export interface MotionRendererProps {
  children: React.ReactNode;
  contentClassName?: string;
  theme: ReduxThemeProps;
  code: string;
  desc: string;
  isMobile: boolean;
  wrapperClassName?: string;
}
export interface MotionCarouselProps {
  data: MotionCarouselItem[];
  fallback?: React.ReactNode;
  controlConfig?: ImageMotionCASProps;
}
export interface MotionCarouselItem {
  url: string;
  animation: AnimationKeys[] | AnimationKeys;
  animationDuration?: number;
  mode?: ImageMotionFnTypes;
  transition?: TransitionKeys;
  delayLogic: DelayLogic;
  pieces?: number;
  badge?: string;
}
export interface MotionRendererItem {
  child: React.ReactNode;
  contentClassName?: string;
  wrapperClassName?: string;
  code: string;
  desc: string;
}
export interface RadarItem {
  id: number;
  render: string;
  lang: string;
  title: string;
  desc: string;
}
export interface SearchBarProps {
  handleChange: (e: string) => void;
  value: string;
}
/* --------- Component Types Ends --------- */

/* --------- Custom Hooks Types --------- */

export interface UseNavigationItemProps {
  name: string;
  url: string;
}
export interface UseNavigationProps {
  parent: UseNavigationItemProps;
  child?: UseNavigationItemProps;
}

/* --------- Custom Hooks Types Ends --------- */

/* --------- Utils Types Starts --------- */

export interface GenerateRandomImageAnimationProps {
  animations: AnimationKeys[];
  transition: TransitionKeys;
  delayLogic: DelayLogic;
  totalDelay: number;
  animationDuration: number;
}

/* --------- Utils Types Ends --------- */

/* --------- Lib Types Starts --------- */

/* --------- Lib Types Ends --------- */

/* --------- Types Starts --------- */

export type ComponentLevels = "beginner" | "intermediate" | "advanced";
export type ImageMotionEnginePresetTypes =
  | "sea"
  | "fractal"
  | "woman"
  | "moon"
  | "tree";

/* --------- Types Ends --------- */
