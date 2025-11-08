import type { AnimationModule, AnimationObjProps } from "../types";

export function merge(
  key: "initial" | "animate",
  animation: AnimationModule[],
) {
  const out = {} as AnimationObjProps;
  for (const anim of animation) {
    const part = anim[key];
    if (part) Object.assign(out, part);
  }
  return out;
}
