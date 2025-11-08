import { useMemo } from "react";
import { merge } from "../lib/mergeAnimation";
import type {
  UseAnimationMixerProps,
  UseOutputAnimationMixerProps,
} from "../types";

export const useAnimationMixer = ({
  animations: a,
  reverse,
}: UseAnimationMixerProps): UseOutputAnimationMixerProps =>
  useMemo(() => {
    if (!Array.isArray(a)) {
      return reverse
        ? { initial: a.animate, animate: a.initial }
        : { initial: a.initial, animate: a.animate };
    }

    const mergedInitial = merge("initial", a);
    const mergedAnimate = merge("animate", a);

    return reverse
      ? { initial: mergedAnimate, animate: mergedInitial }
      : { initial: mergedInitial, animate: mergedAnimate };
  }, [a, reverse]);
