import {
  AnimationKeys,
  DelayLogic,
  TransitionKeys,
} from "@/components/MotionProvider/types";
import { GenerateRandomImageAnimationProps } from "@/interfaces";
import animationsLib from "@/components/MotionProvider/lib/animate.lib";
import transitionsLib from "@/components/MotionProvider/lib/transitions.lib";

export default function generateRandomImageAnimations({
  resolve,
}: {
  resolve: boolean;
}): GenerateRandomImageAnimationProps {
  const TOTAL_DELAY = 0;
  const ANIMATION_DURATION = 1;

  const animationLib = Object.keys(animationsLib).filter(
    (val) => val !== "default"
  );
  const transitionLib = Object.keys(transitionsLib).filter(
    (val) => val !== "custom"
  );

  const a = animationLib as AnimationKeys[];
  const r = Array.from(
    { length: Math.floor(Math.random() * 2) + 1 },
    () => a[Math.floor(Math.random() * a.length)]
  ).filter((x, i, y) => y.indexOf(x) === i);

  const t = transitionLib as TransitionKeys[];
  const rt = t[Math.floor(Math.random() * t.length)];
  const d = "sinusoidal" as DelayLogic;

  if (resolve) {
    const rtd = Number((Math.random() * (5 - 0.5) + 0.5).toFixed(1));
    const rad = Number((Math.random() * (3 - 0.5) + 0.5).toFixed(1));
    return {
      animations: r.length > 0 ? r : ["opacity"],
      transition: rt,
      delayLogic: d,
      totalDelay: rtd,
      animationDuration: rad,
    };
  }

  return {
    animations: r.length > 0 ? r : ["opacity"],
    transition: rt,
    delayLogic: d,
    totalDelay: TOTAL_DELAY,
    animationDuration: ANIMATION_DURATION,
  };
}
