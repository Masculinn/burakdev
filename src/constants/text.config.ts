import type { TextAnimatorProps } from "@/interfaces";

export default [
  {
    animation: {
      mode: ["fadeIn"],
      transition: "smooth",
      duration: 1,
      delay: 1,
    },
    config: {
      duration: 0.016,
      mode: "chars",
      delayLogic: "linear",
    },
    className: "inline text-rose-500",
    children: "full-stack software engineer",
  },
  {
    animation: {
      mode: ["neonGlow", "rotateFlipY"],
      transition: "smooth",
      duration: 1,
      delay: 4,
    },
    config: {
      duration: 0.016,
      mode: "chars",
      delayLogic: "linear",
    },
    className: "inline text-emerald-500",
    children: "Warsaw",
  },
  {
    animation: {
      mode: ["transformTextGradient", "fadeIn"],
      transition: "elasticHard",
      duration: 2,
      delay: 4.5,
    },
    config: {
      duration: 0.5,
      mode: "words",
      delayLogic: "bounce",
    },
    children: "clean, type-safe, efficient code",
  },
  {
    animation: {
      mode: ["fadeLeft", "rotateFlipX"],
      transition: "gentle",
      delay: 5.5,
      duration: 1,
    },
    children: "exceptional user experiences",
    config: {
      mode: "words",
      duration: 0.1,
    },
    className: "inline text-indigo-400",
  },
  {
    animation: {
      mode: ["rotateFlipY", "rotateClockwise", "filterBlurIn", "fadeRight"],
      transition: "cubicElastic",
      delay: 5.5,
      duration: 2,
    },
    children: "business goals",
    config: {
      mode: "words",
      duration: 0.77,
    },
    className: "inline text-blue-500",
  },
  {
    animation: {
      mode: ["fadeRight", "textShimmer"],
      transition: "linear",
      duration: 1,
      delay: 6.5,
    },
    children: "freelance projects",
    config: {
      duration: 0.06,
      mode: "chars",
    },
    className: "inline text-indigo-500",
  },
] as const satisfies TextAnimatorProps[];
