import {
  AnimationKeys,
  DelayLogic,
  ImageMotionFnTypes,
  TransitionKeys,
} from "../../MotionProvider/types";

export interface MdHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size: "xl" | "lg" | "md" | "sm" | "xs";
}

export interface MdImageOptions {
  isAnimated: boolean;
  dimensions: { width: number; height: number };
  pieces?: number;
  delayLogic?: DelayLogic;
  transition?: TransitionKeys;
  fn?: ImageMotionFnTypes;
  animations?: AnimationKeys[];
}
