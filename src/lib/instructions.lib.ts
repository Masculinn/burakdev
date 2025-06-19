import { RadarItem } from "@/interfaces";

export default [
  {
    id: 1,
    render: `MotionProvider/
├── hooks/
├── lib/
├── types/
└── utils/`,
    desc: `Please create a component folder inside your root src folder. 
    Inside, create a folder named 'MotionProvider'. 
    Then inside 'MotionProvider' folder create 4 new folder named 
    'hooks', 'lib', 'types', 'utils'. 
    The project hierarchy should look like above right now 
    my lovely developer ❤️.`,
    lang: "bash",
    title: "Prepare Structure.",
  },
  {
    id: 2,
    render: `MotionProvider/
├── hooks/
│   ├── use-animation-mixer.tsx
├── lib/
├── types/
└── utils/`,
    desc: `Well down my lord, right now we should dive into folders, 
    make all fill fulled. Navigate to 'hooks' folder then create 1 
    new file named 'use-animation-mixer.tsx'. Your hierarchy should 
    look like above after creating this file.`,
    lang: "bash",
    title: "Let's get started.",
  },
  {
    id: 3,
    render: `import { useMemo } from "react";
import {
  AnimationObjProps,
  UseAnimationMixerProps,
  UseOutputAnimationMixerProps,
} from "../types";

export const useAnimationMixer = ({
  animations: a,
  reverse,
}: UseAnimationMixerProps): UseOutputAnimationMixerProps => {
  const combinedAnimations = useMemo(() => {
    if (!Array.isArray(a) || a.length === 0) {
      console.warn("Animations should be a non-empty array.");
      return { initial: {}, animate: {} };
    }

    const mergedInitial = a.reduce(
      (acc, anim) => ({ ...acc, ...anim.initial }),
      {} as AnimationObjProps
    );
    const mergedAnimate = a.reduce(
      (acc, anim) => ({ ...acc, ...anim.animate }),
      {} as AnimationObjProps
    );

    return reverse
      ? { initial: mergedAnimate, animate: mergedInitial }
      : { initial: mergedInitial, animate: mergedAnimate };
  }, [a, reverse]);

  return combinedAnimations;
};
`,
    desc: `Let's put some code in this file. Below you have the 
    code that you have to copy & paste into our brand new 
    'use-animation-mixer.tsx' file. It may show some errors 
    and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "useAnimationMixer()",
  },
  {
    id: 4,
    render: `MotionProvider/
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
├── types/
└── utils/`,
    desc: `How quick you can install? Let's do challange now. 
Here the another file you have to create inside 'hooks/' directory 
named 'use-animation.tsx'.  After creating you project directory 
structure should look like:`,
    lang: "typescript",
    title: "Continue with useAnimation()",
  },
  {
    id: 5,
    render: `import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";
import { UseMotionOutputProps, UseMotionProps } from "../types";

export const useAnimation = (props: UseMotionProps): UseMotionOutputProps => {
  const {
    stopAnimation = false,
    reverseAnimation = false,
    recallDuration = 100,
  } = props;

  const [animationConfig, setAnimationConfig] = useState<UseMotionOutputProps>({
    isAnimationStopped: false,
    reverse: false,
  });

  const handleStopAnimation = useCallback(
    debounce(() => {
      setAnimationConfig({
        isAnimationStopped: true,
        reverse: false,
      });
    }, recallDuration),
    []
  );

  const handleReset = useCallback(
    debounce(() => {
      setAnimationConfig({
        isAnimationStopped: false,
        reverse: false,
      });
    }, recallDuration),
    []
  );

  useEffect(() => {
    if (stopAnimation && !reverseAnimation) {
      setAnimationConfig({
        isAnimationStopped: true,
        reverse: true,
      });

      handleStopAnimation();
    } else if (stopAnimation && reverseAnimation) {
      setAnimationConfig({
        isAnimationStopped: true,
        reverse: false,
      });

      handleReset();
    } else {
      setAnimationConfig({
        isAnimationStopped: false,
        reverse: reverseAnimation,
      });
    }

    return () => {
      handleStopAnimation.cancel();
      handleReset.cancel();
    };
  }, [stopAnimation, reverseAnimation, handleStopAnimation]);

  return animationConfig;
};
`,
    desc: `Now quickly you can navigate to the file we created named 
    'use-animation.tsx'? Navigate to 'use-animation.tsx' file and 
    paste the code shown below. It may show some errors 
    and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "useAnimation()",
  },
  {
    id: 6,
    render: `MotionProvider/
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
├── types/
└── utils/`,
    desc: "Congrats lord, you have successfully completed the hooks setup 🎉. Now let's move to the main lib folder. Navigate to 'lib/' folder and create a new file named 'animate.lib.ts'. Then, Your project directory structure should look like this:",
    lang: "typescript",
    title: "Let's start to building libs.",
  },
  {
    id: 7,
    render: `import { AnimationLibraryProps } from "../types";

const animations: AnimationLibraryProps = {
  /* ------------------- Default Animation(s) ------------------ */
  default: {
    initial: {},
    animate: {},
  },
  //Never remove opacity from this lib otherwise it will break the logic
  opacity: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  spin: {
    initial: { rotate: 0 },
    animate: { rotate: -360 },
  },
  /* ------------------- Slide Animations ------------------ */

  slideDown: {
    initial: { y: "-100%" },
    animate: { y: 0 },
  },
  slideLeft: {
    initial: { x: "100%" },
    animate: { x: 0 },
  },
  slideRight: {
    initial: { x: "-100%" },
    animate: { x: 0 },
  },
  slideUp: {
    animate: { y: 0 },
    initial: { y: "100%" },
  },

  /* ------------------- Staggered Animations ------------------ */

  staggeredIn: {
    initial: { x: "-50%" },
    animate: {
      x: 0,
    },
  },
  staggeredOut: {
    initial: { x: "-50%" },
    animate: {
      x: 0,
    },
  },

  /* ------------------- Fade Animations ------------------ */

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
    },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
    },
  },

  /* ------------------- Zoom & Scale Animations ------------------ */

  scaleZoomIn: {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
  },
  scaleZoomOut: {
    initial: { scale: 1.2 },
    animate: { scale: 1 },
  },
  scaleGrowShrink: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
    },
  },

  /* ------------------- Rotate Animations ------------------ */

  rotateIn: {
    initial: { rotate: -90 },
    animate: { rotate: 0 },
  },
  rotateOut: {
    initial: { rotate: 0 },
    animate: { rotate: 90 },
  },
  rotateFlipX: {
    initial: { rotateX: -180 },
    animate: { rotateX: 0 },
  },
  rotateFlipY: {
    initial: { rotateY: -180 },
    animate: { rotateY: 0 },
  },
  rotateSwing: {
    initial: { rotate: 0 },
    animate: {
      rotate: [15, -10, 5, -5, 0],
    },
  },
  rotateClockwise: {
    initial: { rotate: -45 },
    animate: {
      rotate: 0,
    },
  },
  rotateRoll: {
    initial: { rotateZ: -120 },
    animate: {
      rotateZ: 0,
    },
  },
  rotating360: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
    },
  },

  /* ------------------- Bounce Animations ------------------ */

  bounceY: {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 10, -10, 5, 0],
    },
  },
  bounceX: {
    initial: { x: 0 },
    animate: {
      x: [-10, 10, -10, 10, -5, 5, 0],
    },
  },
  rotateBounce: {
    initial: { rotate: -90, y: 0 },
    animate: {
      rotate: [0, 15, -10, 5, 0],
      y: [0, -20, 10, -10, 0],
    },
  },
  elasticBounce: {
    initial: { y: 0 },
    animate: {
      y: [0, -30, 20, -15, 5, 0],
    },
  },
  bounceInOut: {
    initial: { y: 0 },
    animate: {
      y: [0, -40, 20, -10, 0],
    },
  },

  /* ------------------- Burak's special Animations ------------------ */

  burakHeartbeat: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
    },
  },
  burakRubberBand: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.25, 0.75, 1.15, 0.95, 1],
    },
  },
  burakWobble: {
    initial: { x: 0, rotate: 0 },
    animate: {
      x: [0, -20, 15, -10, 5, 0],
      rotate: [0, -5, 3, -3, 0],
    },
  },
  burakPulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
    },
  },

  /* ------------------- Skew Animations ------------------ */

  skewX: {
    initial: { skewX: 30 },
    animate: {
      skewX: 0,
    },
  },

  /* ------------------- Custom Animations ------------------ */

  textShimmer: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 0, 1],
    },
  },
  swingHorizontal: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -5, 5, 0],
    },
  },
  flash: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0, 1],
    },
  },
  hoverEffect: {
    initial: { scale: 1 },
    animate: {
      scale: 1.1,
    },
  },
  wave: {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 15, -15, 15, -15, 0],
    },
  },

  /**
   *   Animations like Joe Biden(alien)
   *   no need for second animation object
   *   into mode property of <ViewAnimationsContainer />
   *
   */

  funChickenDance: {
    initial: { rotate: 0, x: 0 },
    animate: {
      rotate: [0, 10, -10, 10, -10, 0],
      x: [0, 5, -5, 5, -5, 0],
    },
  },
  funJellyFish: {
    initial: { scale: 1, y: 0 },
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
      y: [0, -10, 10, -5, 5, 0],
    },
  },
  funRocketBoost: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: [50, 0, -10, 0],
      opacity: 1,
    },
  },
  funDizzyLizard: {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 360, 720, 1080, 1440],
      scale: [1, 1.2, 0.8, 1],
    },
  },
  funBlobMorph: {
    initial: { scale: 1, borderRadius: "0%" },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      borderRadius: ["0%", "50%", "25%", "50%", "0%"],
    },
  },
  funMoonWalk: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -10, 20, -30, 40, 0],
      opacity: [1, 0.8, 0.6, 0.4, 0.2, 1],
    },
  },
  funPeekABoo: {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.5, 0.5, 1],
      opacity: [0, 1, 0, 1],
    },
  },
  funSnailTrail: {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: ["-100%", "-50%", "-25%", "-10%", "0%"],
      opacity: [0, 0.3, 0.5, 0.8, 1],
    },
  },
  funPopcornPop: {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [0, -20, 10, -5, 2, 0],
      scale: [1, 1.1, 1.2, 0.9, 1.05, 1],
    },
  },
  funYoYoSpin: {
    initial: { rotate: 0, y: 0 },
    animate: {
      rotate: [0, 360, -360, 360],
      y: [0, -10, 20, -10, 0],
    },
  },
  funWarpDrive: {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: [0.5, 1.5, 0.7, 1],
      opacity: [0, 0.5, 1, 1],
    },
  },
  funSpringFling: {
    initial: { y: 0 },
    animate: {
      y: [0, -50, 25, -12, 6, 0],
    },
  },
  funTwinkleToes: {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      opacity: [0, 0.5, 0.8, 1],
    },
  },
  funGhostFloat: {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: [20, 10, 5, 0, -5, -10, 0],
      opacity: [0, 0.3, 0.6, 0.9, 1],
    },
  },

  /* ------------------- Filter Animations ------------------ */

  filterBlurIn: {
    initial: { filter: "blur(10px)" },
    animate: {
      filter: "blur(0px)",
    },
  },
  filterBlurOut: {
    initial: { filter: "blur(0px)" },
    animate: {
      filter: "blur(10px)",
    },
  },
  filterBrightnessFade: {
    initial: { filter: "brightness(0.5)" },
    animate: { filter: "brightness(1)" },
  },
  filterContrastShift: {
    initial: { filter: "contrast(50%)" },
    animate: { filter: "contrast(100%)" },
  },
  filterGrayscaleFade: {
    initial: { filter: "grayscale(100%)" },
    animate: { filter: "grayscale(0%)" },
  },
  filterHueRotate: {
    initial: { filter: "hue-rotate(0deg)" },
    animate: { filter: "hue-rotate(360deg)" },
  },
  filterInvertColors: {
    initial: { filter: "invert(0%)" },
    animate: { filter: "invert(100%)" },
  },
  filterSaturateIncrease: {
    initial: { filter: "saturate(50%)" },
    animate: { filter: "saturate(200%)" },
  },
  filterSepiaTone: {
    initial: { filter: "sepia(0%)" },
    animate: { filter: "sepia(100%)" },
  },

  /* ------------------- 3D Translate Animations ------------------ */

  translate3dIn: {
    initial: { transform: "translate3d(-100px, -100px, -100px)" },
    animate: { transform: "translate3d(0px, 0px, 0px)" },
  },
  translate3dOut: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: { transform: "translate3d(100px, 100px, 100px)" },
  },
  translate3dRotate: {
    initial: { transform: "translate3d(-50px, -50px, -50px) rotate(0deg)" },
    animate: { transform: "translate3d(0px, 0px, 0px) rotate(360deg)" },
  },
  translate3dZoom: {
    initial: { transform: "translate3d(-50px, 0px, -100px) scale(0.5)" },
    animate: { transform: "translate3d(0px, 0px, 0px) scale(1)" },
  },
  translate3dBounce: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(0px, -30px, 0px)",
        "translate3d(0px, 15px, 0px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },
  translate3dWave: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(10px, 0px, 10px)",
        "translate3d(-10px, 0px, -10px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },
  translate3dZigZag: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(20px, -10px, 10px)",
        "translate3d(-20px, 10px, -10px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },
};

export default animations;`,
    desc: `Now, navigate to the 'animate.lib.ts' file and paste the code shown below. It may show some errors and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "animate.lib.ts",
  },
  {
    id: 8,
    render: `
MotionProvider/
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
    `,
    desc: `You are doing great lord! Now, please navigate to 'lib/' folder and create a new file named 'transitions.lib.ts'. Then, Your project directory structure should look like this:`,
    lang: "typescript",
    title: "Continue with libs...",
  },
  {
    id: 9,
    render: `import { TransitionConfig } from "../types";

const transitions: { [key: string]: TransitionConfig } = {
  none: {},
  // Do not remove the default from this file.
  default: { duration: 1, ease: "easeInOut" },
  smooth: { duration: 1, ease: "easeInOut" },
  easeIn: { duration: 0.6, ease: "easeIn" },
  easeOut: { duration: 0.6, ease: "easeOut" },
  linear: { duration: 0.6, ease: "linear" },
  cubicSmooth: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] },
  cubicFastStart: { duration: 0.6, ease: [0.55, 0.085, 0.68, 0.53] },
  cubicFastEnd: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  cubicBounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
  cubicElastic: { duration: 0.8, ease: [0.47, 1.64, 0.41, 0.8] },
  slowSmooth: { duration: 1.5, ease: "easeInOut" },
  slowCubic: { duration: 1.5, ease: [0.17, 0.55, 0.55, 1] },
  slowElastic: { duration: 2, ease: [0.47, 1.64, 0.41, 0.8] },
  quickEaseInOut: { duration: 0.3, ease: "easeInOut" },
  quickBounce: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] },
  delayedSmooth: { duration: 0.6, ease: "easeInOut" },
  delayedCubic: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] },
  delayedElastic: { duration: 0.8, ease: [0.47, 1.64, 0.41, 0.8] },
  fadeSlide: { duration: 0.6, ease: "easeInOut" },
  fadeScale: { duration: 0.6, ease: "easeInOut" },
  fadeRotate: { duration: 0.6, ease: "easeInOut" },
};

export default transitions;`,
    desc: `Let's finish libs very quick. Copy the code shown below and paste into our virgin 'transitions.lib.ts' file . It may show some errors and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "transitions.lib.ts",
  },
  {
    id: 10,
    render: `
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
    `,
    desc: `Now, please navigate to 'types/' folder and create a new file named 'index.ts'. Then, Your project directory structure should look like this:`,
    lang: "typescript",
    title: "Types knocking our door 🚪",
  },
  {
    id: 11,
    render: `import { UseInViewOptions } from "motion/react";

export interface AnimationObjProps {
  [key: string]: any;
}
export interface TransitionDurationProps {
  animationDuration: number;
  easeDuration: number;
}
export interface ViewAnimationControllerProps {
  elementType: React.ElementType;
  mode: AnimationKeys | AnimationKeys[];
  configView?: UseInViewOptions;
  children?: React.ReactNode;
  reverse?: boolean;
  className?: string;
  isControlled?: AnimationController;
  delay?: number;
  isAnimationStopped?: boolean;
  transition?: TransitionKeys;
  duration?: number;
  [key: string]: any;
}
export interface MotionEngineProps {
  delay?: number;
  reverse?: boolean;
  duration?: number;
  isAnimationStopped: boolean;
}
export interface EngineControllerProps {
  controllerTrigger: boolean;
  controllerConfig: MotionEngineProps;
  controllerMode: AnimationKeys[] | AnimationKeys;
  controllerTransition: TransitionKeys;
}
export type MotionEngineType = "container" | "text" | "queue";
export interface AnimationController {
  trigger: boolean;
}
export interface AnimationLibraryProps {
  [key: string]: {
    initial: AnimationObjProps;
    animate: AnimationObjProps;
  };
}
export interface TransitionConfig {
  duration?: number;
  ease?: string | number[];
  delay?: number;
}
export interface MotionTextKeywordsProps {
  word: string;
  animation: AnimationKeys | AnimationKeys[];
}
export interface MotionTextProps {
  className?: string;
  keywords: MotionTextKeywordsProps[];
  highlightLastIndexFrom?: number;
}
export interface AnimationQueueProps {
  animations: AnimationQueueAnimationProps[];
  duration?: number;
  className?: string;
  isDynamicallyQueued?: boolean;
  delayByElement?: number;
  children: React.ReactNode[];
  elementType: React.ElementType;
}
export interface AnimationQueueAnimationProps {
  mode: AnimationKeys | AnimationKeys[];
  reverse?: boolean;
  className?: string;
  isControlled?: AnimationController;
  delay?: number;
  isAnimationStopped?: boolean;
  transition?: TransitionKeys;
  duration?: number;
  configView?: UseInViewOptions;
}
export interface UseAnimationMixerProps {
  animations: AnimationLibraryProps[] | AnimationLibraryProps;
  reverse?: boolean;
}
export interface UseOutputAnimationMixerProps {
  initial: AnimationObjProps;
  animate: AnimationObjProps;
}
export interface UseMotionProps {
  stopAnimation: boolean;
  reverseAnimation?: boolean;
  recallDuration?: number;
}
export interface UseMotionOutputProps {
  isAnimationStopped: boolean;
  reverse: boolean;
}

export interface calculateDelayProps {
  delayLogic: DelayLogic;
  index: number;
  baseDuration: number;
  customLogic?: (index: number) => number;
}

export interface ImageMotionProps {
  imageUrl: string;
  pieces: number;
  animations: AnimationKeys[] | AnimationKeys;
  fallback?: React.ReactNode;
  motionFn?: ImageMotionFnTypes;
  transition?: TransitionKeys;
  totalDelay?: number;
  animationDuration?: number;
  configView?: UseInViewOptions;
  controlConfig?: ImageMotionCASProps;
  wrapperClassName?: string;
  elementClassname?: string;
  delayLogic?: DelayLogic;
  customDelayLogic?: (index: number) => number;
  isDynamicallyQueued?: boolean;
}
export interface ImageMotionCASProps {
  isControlled: boolean;
  isAnimationStopped: boolean;
  reverse: boolean;
}
export interface ImageQueueProps {
  images: string[];
  pieces: number;
  enterAnimation: AnimationKeys[] | AnimationKeys;
  exitAnimation: AnimationKeys[] | AnimationKeys;
  fallback?: React.ReactNode;
  motionFn?: ImageMotionFnTypes;
  transition?: TransitionKeys;
  totalDelay?: number;
  animationDuration?: number;
  configView?: UseInViewOptions;
  controlConfig?: ImageMotionCASProps;
  wrapperClassName?: string;
  elementClassname?: string;
  delayLogic?: DelayLogic;
  customDelayLogic?: (index: number) => number;
  isDynamicallyQueued?: boolean;
}

export type ImageMotionFnTypes = "hover" | "click";

export type DelayLogic =
  | "linear"
  | "exponential"
  | "sinusoidal"
  | "custom"
  | "square"
  | "triangle"
  | "sawtooth"
  | "cosine"
  | "fibonacci"
  | "chaos"
  | "pendulum"
  | "perlin"
  | "chaotic"
  | "cumulative"
  | "bounce"
  | "spiral"
  | "quantum";

export type AnimationKeys =
  | "opacity"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "staggeredIn"
  | "staggeredOut"
  | "fadeIn"
  | "fadeOut"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleZoomIn"
  | "scaleZoomOut"
  | "scaleGrowShrink"
  | "rotateIn"
  | "rotateOut"
  | "rotateFlipX"
  | "rotateFlipY"
  | "rotateSwing"
  | "rotateClockwise"
  | "rotateRoll"
  | "rotating360"
  | "bounceY"
  | "bounceX"
  | "rotateBounce"
  | "elasticBounce"
  | "bounceInOut"
  | "burakHeartbeat"
  | "burakRubberBand"
  | "burakWobble"
  | "burakPulse"
  | "skewX"
  | "textShimmer"
  | "swingHorizontal"
  | "flash"
  | "hoverEffect"
  | "wave"
  | "funChickenDance"
  | "funJellyFish"
  | "funRocketBoost"
  | "funDizzyLizard"
  | "funBlobMorph"
  | "funMoonWalk"
  | "funPeekABoo"
  | "funSnailTrail"
  | "funPopcornPop"
  | "funYoYoSpin"
  | "funWarpDrive"
  | "funSpringFling"
  | "funTwinkleToes"
  | "funGhostFloat"
  | "filterBlurIn"
  | "filterBlurOut"
  | "filterBrightnessFade"
  | "filterContrastShift"
  | "filterGrayscaleFade"
  | "filterHueRotate"
  | "filterInvertColors"
  | "filterSaturateIncrease"
  | "filterSepiaTone"
  | "translate3dIn"
  | "translate3dOut"
  | "translate3dRotate"
  | "translate3dZoom"
  | "translate3dBounce"
  | "translate3dWave"
  | "translate3dZigZag"
  | "spin";

export type TransitionKeys =
  | "none"
  | "default"
  | "smooth"
  | "easeIn"
  | "easeOut"
  | "linear"
  | "cubicSmooth"
  | "cubicFastStart"
  | "cubicFastEnd"
  | "cubicBounce"
  | "cubicElastic"
  | "slowSmooth"
  | "slowCubic"
  | "slowElastic"
  | "quickEaseInOut"
  | "quickBounce"
  | "delayedSmooth"
  | "delayedCubic"
  | "delayedElastic"
  | "fadeSlide"
  | "fadeScale"
  | "fadeRotate";
`,
    desc: `Without looking the any other files, you can purely undertand what Motion Provider does at the background by looking this file. Please copy the code shown below and paste into our 'index.ts' file. Right now the errors on your editor will be reduced by half.`,
    lang: "typescript",
    title: "This file holds everything!",
  },
  {
    id: 12,
    render: `MotionProvider/
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
└── utils/
    └── calculateDelay.ts
`,
    desc: `Navigate to 'utils/' file then create a new file named 'calculateDelay.ts'. Then, Your project directory structure should look like this:`,
    lang: "bash",
    title: "Let's create the last file on our folders.",
  },
  {
    id: 13,
    render: `
    import { calculateDelayProps } from "../types";

/**
 * Internal state used for delay calculations.
 * @private
 * @property {number[]} fibonacci - Stores Fibonacci sequence values.
 * @property {number} chaosValue - Current value for chaotic delay calculations.
 * @property {number} accumulatedDelay - Accumulated delay for cumulative logic.
 */
const state = {
  fibonacci: [0, 1],
  chaosValue: 0.5,
  accumulatedDelay: 0,
};

/**
 * Calculates the delay based on the provided delay logic.
 *
 * The function supports various delay calculation logics:
 * - **linear**: Delay increases linearly with the index.
 * - **exponential**: Delay increases exponentially (2^index).
 * - **sinusoidal**: Delay is determined using the sine of the index.
 * - **cosine**: Delay is determined using the cosine of the index.
 * - **square**: Alternates delay based on whether the index is even or odd.
 * - **triangle**: Delay follows a triangle wave pattern with a period of 4.
 * - **sawtooth**: Delay follows a sawtooth wave pattern with a period of 4.
 * - **fibonacci**: Delay follows the Fibonacci sequence.
 * - **pendulum**: Delay is based on a damped sine function to mimic pendulum motion.
 * - **perlin**: Delay is calculated using a simple pseudo-random noise function.
 * - **chaotic**: Delay is calculated using a chaotic (logistic) map.
 * - **cumulative**: Delay accumulates over time based on a sine function.
 * - **bounce**: Delay simulates a bouncing effect using gravity.
 * - **spiral**: Delay is calculated based on a spiral function using cosine and sine.
 * - **quantum**: Delay is derived from a combination of sine and cosine to mimic probability.
 * - **custom**: Uses a custom delay logic provided via a callback function.
 *
 * @param {calculateDelayProps} props - The properties for calculating delay.
 * @param {number} props.baseDuration - The base duration multiplier for delay calculation.
 * @param {number} props.index - The current index used to calculate the delay.
 * @param {string} props.delayLogic - The delay logic to apply. One of: "linear", "exponential", "sinusoidal", "cosine", "square", "triangle", "sawtooth", "fibonacci", "pendulum", "perlin", "chaotic", "cumulative", "bounce", "spiral", "quantum", or "custom".
 * @param {(index: number) => number} [props.customLogic] - A custom function to calculate the delay when 'delayLogic' is "custom".
 * @returns {number} The calculated delay value.
 */

export const calculateDelay = ({
  baseDuration,
  index,
  delayLogic,
  customLogic,
}: calculateDelayProps): number => {
  switch (delayLogic) {
    case "linear":
      return index * baseDuration;
    case "exponential":
      return Math.pow(2, index) * baseDuration;
    case "sinusoidal":
      return Math.sin(index) * baseDuration;
    case "cosine":
      return Math.cos(index) * baseDuration;
    case "square":
      return (index % 2) * baseDuration;
    case "triangle": {
      const period = 4;
      const position = index % period;
      return (
        (position < period / 2 ? position : period - position) * baseDuration
      );
    }
    case "sawtooth": {
      const period = 4;
      return (index % period) * baseDuration;
    }
    case "fibonacci": {
      while (state.fibonacci.length <= index + 1) {
        state.fibonacci.push(
          state.fibonacci[state.fibonacci.length - 1] +
            state.fibonacci[state.fibonacci.length - 2]
        );
      }
      return state.fibonacci[index] * baseDuration;
    }
    case "pendulum": {
      const damping = 0.1;
      const frequency = 2;
      return (
        Math.exp(-damping * index) * Math.sin(frequency * index) * baseDuration
      );
    }
    case "perlin": {
      const noise = (n: number) => {
        n = (n << 13) ^ n;
        return (
          1 -
          ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) /
            1073741824
        );
      };
      return noise(index) * baseDuration;
    }
    case "chaotic": {
      const r = 3.99;
      state.chaosValue = r * state.chaosValue * (1 - state.chaosValue);
      return state.chaosValue * baseDuration * 10;
    }
    case "cumulative": {
      state.accumulatedDelay += (Math.sin(index) + 1) * baseDuration;
      return state.accumulatedDelay;
    }
    case "bounce": {
      const gravity = 0.8;
      const bounceHeight = Math.pow(gravity, index % 5) * baseDuration;
      return bounceHeight;
    }
    case "spiral": {
      const angle = index * 0.5;
      const spiralOffset = Math.sqrt(index) * baseDuration;
      return (Math.cos(angle) + Math.sin(angle)) * spiralOffset;
    }
    case "quantum": {
      const probability = Math.abs(Math.sin(index) * Math.cos(index * 0.5));
      return probability * baseDuration * 2;
    }
    case "custom":
      return customLogic ? customLogic(index) : index * baseDuration;
    default:
      return index * baseDuration;
  }
};

`,
    desc: `Please copy the code shown below and paste into our 'calculateDelay.ts' file. It may show some errors and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "calculateDelay()",
  },
  {
    id: 14,
    render: `MotionProvider/
├── motion-container.tsx
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
└── utils/
    └── calculateDelay.ts
`,
    desc: `Well done lord, until this time, you have been created everything sucessfully. Right now we will focus on our essentials. Navigate to root of the 'MotionProvider' folder and create a new file named 'motion-container.tsx'. Then, Your project directory structure should look like this:`,
    lang: "bash",
    title: "Time to build the gangs.",
  },
  {
    id: 15,
    render: `import {
  AnimationObjProps,
  TransitionConfig,
  ViewAnimationControllerProps,
} from "./types";
import { cn } from "@/lib/utils";
import transitions from "./lib/transitions.lib";
import { motion, useInView } from "motion/react";
import React, { FC, memo, useId, useMemo, useRef } from "react";
import { useAnimationMixer } from "./hooks/use-animation-mixer";
import animations from "@/components/MotionProvider/lib/animate.lib";
import dynamic from "next/dynamic";

const Container: FC<ViewAnimationControllerProps> = ({
  children,
  elementType = "div",
  className,
  delay = 0,
  isAnimationStopped = false,
  isControlled = false,
  duration = 0.5,
  reverse = false,
  transition,
  mode,
  configView = { once: true, amount: 0.5 },
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, configView);
  const id = useId();

  const animationsToMix = useMemo(() => {
    return Array.isArray(mode)
      ? mode.map((key) => animations[key] || { initial: {}, animate: {} })
      : [animations[mode] || { initial: {}, animate: {} }];
  }, [mode]);

  const { initial, animate } = useAnimationMixer({
    animations: animationsToMix as AnimationObjProps[],
    reverse,
  });

  const transitionConfig: TransitionConfig = useMemo(() => {
    const defaultTransition = transitions[transition || "default"];
    if (isAnimationStopped) {
      return {
        ...defaultTransition,
        duration: duration || defaultTransition.duration,
        delay: 0,
      };
    }
    return {
      ...defaultTransition,
      duration: duration || defaultTransition.duration,
      delay,
    };
  }, [isAnimationStopped]);

  const animationState = useMemo(() => {
    if (isAnimationStopped) {
      return { ...animations["opacity"].animate, ...animate };
    }

    if (isControlled) {
      if (typeof isControlled === "object" && "trigger" in isControlled) {
        return isControlled.trigger ? animate : initial;
      }
    }

    return isInView ? animate : initial;
  }, [isAnimationStopped, isInView, isControlled, initial, animate]);

  const initialState = useMemo(() => {
    if (isAnimationStopped) {
      return { ...animations["opacity"].initial, ...initial };
    }
    return initial;
  }, [isAnimationStopped, initial]);

  return React.createElement(
    motion[elementType as keyof typeof motion] as React.ElementType,
    {
      className: cn("view-animation-container", className),
      ref,
      key: id,
      initial: initialState,
      animate: animationState,
      transition: transitionConfig,
    },
    children
  );
};

/**
 * A container component that handles view-based animations using Framer Motion.
 *
 * @component
 * @param {ViewAnimationControllerProps} props - The properties for the animation container.
 * @param {React.ReactNode} props.children - The child elements to be animated.
 * @param {string} [props.elementType="div"] - The HTML element type for the container.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {number} [props.delay=0] - Delay before the animation starts.
 * @param {boolean} [props.isAnimationStopped=false] - Flag to stop the animation.
 * @param {boolean | { trigger: boolean }} [props.isControlled=false] - Control animation externally.
 * @param {number} [props.duration=0.5] - Animation duration in seconds.
 * @param {boolean} [props.reverse=false] - Whether to reverse the animation.
 * @param {string} [props.transition] - The transition type.
 * @param {string | string[]} [props.mode] - The animation mode(s) to apply.
 * @param {{ once?: boolean, amount?: number }} [props.configView={ once: true, amount: 0.5 }] - View configuration for triggering animations.
 * @returns {JSX.Element} - The animated container element.
 */
const MotionContainer = dynamic(
  () => Promise.resolve(memo(Container as typeof Container)),
  { ssr: false }
);

export default MotionContainer;
`,
    desc: `Please copy the code shown below and paste into our 'motion-container.tsx' file. It may show some errors and that stuffs, no worries, we did not complete the setup yet.`,
    lang: "typescript",
    title: "<MotionContainer />",
  },
  {
    id: 16,
    render: `MotionProvider/
├── motion-container.tsx
├── motion-image.tsx
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
└── utils/
    └── calculateDelay.ts
`,
    desc: `Now let's move to the motion-image component. Navigate to 'MotionProvider' folder and create a new file named 'motion-image.tsx'. Then, Your project directory structure should look like this:`,
    lang: "bash",
    title: "Continue with motion-image.tsx",
  },
  {
    id: 17,
    render:
      "import {   FC,   memo,   useCallback,   useEffect,   useMemo,   useRef,   useState, } from 'react'; import { ImageMotionProps } from './types'; import { cn } from '@/lib/utils';  const ImageContainer: FC<ImageMotionProps> = (props) => {   const {     imageUrl,     pieces = 144,     controlConfig,     fallback = (       <div className='w-full h-full absolute bg-stone-950 animate-pulse' />     ),     motionFn,     animations,     animationDuration = 3,     elementClassname,     wrapperClassName,     isDynamicallyQueued,     transition = 'smooth',     customDelayLogic,     delayLogic = 'sinusoidal',     totalDelay = 0,     configView = { once: true, amount: 'some' },   } = props;    useEffect(() => {     const img = new Image();     img.src = imageUrl;     img.onload = () => setIsImageLoaded(true);      return () => {       img.onload = null;       img.onerror = null;     };   }, [imageUrl]);    const columns = useMemo(() => Math.ceil(Math.sqrt(pieces)), [pieces]);   const rows = useMemo(() => Math.ceil(pieces / columns), [pieces, columns]);    const [isImageLoaded, setIsImageLoaded] = useState(false);   const [triggers, setTriggers] = useState<Record<number, boolean>>({});   const gridRef = useRef<HTMLDivElement | null>(null);   const rafRef = useRef<number>(0);    const handleGridInteraction = useCallback(     (e: React.MouseEvent) => {       if (!motionFn || !gridRef.current) return;        if (rafRef.current) {         cancelAnimationFrame(rafRef.current);       }        rafRef.current = requestAnimationFrame(() => {         const rect = gridRef?.current!.getBoundingClientRect();         const x = e.clientX - rect.left;         const y = e.clientY - rect.top;          const col = Math.floor((x / rect.width) * columns);         const row = Math.floor((y / rect.height) * rows);         const index = row * columns + col;          if (index >= 0 && index < pieces) {           const currentCol = index % columns;           const currentRow = Math.floor(index / columns);           const neighbors: number[] = [];            for (let r = currentRow - 1; r <= currentRow + 1; r++) {             for (let c = currentCol - 1; c <= currentCol + 1; c++) {               if (r >= 0 && r < rows && c >= 0 && c < columns) {                 const neighborIndex = r * columns + c;                 if (neighborIndex < pieces) neighbors.push(neighborIndex);               }             }           }            setTriggers((prev) => ({             ...prev,             ...Object.fromEntries(neighbors.map((idx) => [idx, true])),           }));         }       });     },     [columns, rows, pieces, motionFn]   );    const gridPieces = useMemo(     () =>       Array.from({ length: pieces }).map((_, index) => {         const col = index % columns;         const row = Math.floor(index / columns);          return (           <div             key={index}             className='h-full w-full bg-cover bg-no-repeat border-none'             style={{               backgroundImage: `url('${imageUrl}')`,               backgroundSize: `${columns * 100}% ${rows * 100}%`,               backgroundPosition: `calc(${col} * 100% / ${                 columns - 1               }) calc(${row} * 100% / ${rows - 1})`,             }}           />         );       }),     [pieces, columns, rows, imageUrl]   );    return (     <div className={cn('relative w-full', wrapperClassName)}>       <div         ref={gridRef}         className='grid h-full w-full gap-0'         style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}         onClick={motionFn === 'click' ? handleGridInteraction : undefined}         onMouseMove={motionFn === 'hover' ? handleGridInteraction : undefined}       >         {!isImageLoaded ? (           <>{fallback}</>         ) : (           <MotionQueue             elementType='div'             delayLogic={delayLogic}             customLogic={customDelayLogic}             isDynamicallyQueued={isDynamicallyQueued}             animations={gridPieces.map((_, index) => ({               mode: animations,               duration: animationDuration,               configView,               delay: totalDelay,               transition,               isAnimationStopped: controlConfig?.isAnimationStopped || false,               reverse: controlConfig?.reverse || false,               isControlled: {                 trigger: motionFn                   ? !!triggers[index]                   : controlConfig?.isControlled ?? true,               },             }))}             className={cn(               'relative overflow-hidden',               motionFn && 'cursor-pointer',               elementClassname             )}           >             {gridPieces}           </MotionQueue>         )}       </div>     </div>   ); };  import dynamic from 'next/dynamic'; import MotionQueue from './motion-queue';  /**  * ImageContainer renders an interactive image grid by splitting the image into multiple pieces and applying animations.  *  * The component loads an image from the provided URL and divides it into a grid of pieces. It supports interactive  * animations triggered by mouse click or hover events and uses a queue-based animation system via the `MotionQueue`  * component. The grid pieces are dynamically animated according to the provided animation settings.  *  * @component  * @param {ImageMotionProps} props - The properties for configuring the image motion.  * @param {string} props.imageUrl - The URL of the image to load.  * @param {number} [props.pieces=144] - The number of pieces to divide the image into.  * @param {object} [props.controlConfig] - Configuration object to control the animation state (e.g. stop, reverse).  * @param {React.ReactNode} [props.fallback=<div className='w-full h-full absolute bg-stone-950 animate-pulse' />] - Fallback element shown while the image is loading.  * @param {'click' | 'hover'} [props.motionFn] - The event type to trigger grid interactions ('click' or 'hover').  * @param {any} props.animations - The animation key(s) to be applied to each grid piece.  * @param {number} [props.animationDuration=3] - Duration (in seconds) of the animations.  * @param {string} [props.elementClassname] - Additional CSS class names for the animated element.  * @param {string} [props.wrapperClassName] - Additional CSS class names for the wrapper element.  * @param {boolean} [props.isDynamicallyQueued] - Whether the animations are dynamically queued.  * @param {string} [props.transition='smooth'] - Transition type for the animations.  * @param {(index: number) => number} [props.customDelayLogic] - A custom function to calculate delay for each piece based on its index.  * @param {DelayLogic} [props.delayLogic='sinusoidal'] - The delay logic to use (e.g., 'linear', 'sinusoidal', etc.).  * @param {number} [props.totalDelay=0] - Total delay applied to the animation sequence.  * @param {object} [props.configView={ once: true, amount: 'some' }] - Configuration for view-based animation triggering.  * @returns {JSX.Element} The rendered interactive image grid with animations.  */ const MotionImage = dynamic(   () => Promise.resolve(memo(ImageContainer as typeof ImageContainer)),   { ssr: false } );  export default MotionImage;",
    desc: `Now, navigate to the 'motion-image.tsx' file and paste the code shown below.`,
    lang: "typescript",
    title: "<MotionImage />",
  },
  {
    id: 18,
    render: `MotionProvider/
├── motion-container.tsx
├── motion-image-queue.tsx
├── motion-image.tsx
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
└── utils/
    └── calculateDelay.ts
`,
    desc: `Almost done lord! Now, please navigate to 'MotionProvider' folder and create a new file named 'motion-image-queue.tsx'. Then, Your project directory structure should look like this:`,
    lang: "typescript",
    title: "Almost done!",
  },
  {
    id: 19,
    render: `import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { AnimationKeys, ImageQueueProps } from "./types/index";

const ImageQueueContainer: FC<ImageQueueProps> = (props) => {
  const {
    images = [],
    controlConfig,
    enterAnimation,
    exitAnimation,
    wrapperClassName = "relative",
    animationDuration = 2,
    configView = { once: false, amount: "some" },
    customDelayLogic,
    delayLogic = "sinusoidal",
    pieces = 121,
    elementClassname,
    fallback = (
      <div className="w-full h-full absolute bg-stone-950 animate-pulse" />
    ),
    isDynamicallyQueued,
    motionFn,
    totalDelay = 0,
    transition = "smooth",
  } = props;

  const [time, setTime] = useState<number>(0);
  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [animation, setAnimation] = useState<AnimationKeys[] | AnimationKeys>(
    enterAnimation
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDynamicallyQueued && images.length > 0) {
      const trigger = time % (animationDuration * 2);

      const halfDuration = animationDuration;

      if (trigger === 0) {
        setCurrImgIdx((prev) => (prev + 1) % images.length);
        setAnimation(enterAnimation);
      }

      if (trigger === halfDuration) {
        setTimeout(
          () => setAnimation(exitAnimation),
          (animationDuration / 2) * 1000
        );
      }
    }
  }, [
    time,
    images,
    isDynamicallyQueued,
    animationDuration,
    enterAnimation,
    exitAnimation,
  ]);

  if (images.length === 0) return fallback;

  return useMemo(
    () => (
      <div className={cn("overflow-hidden h-full w-full", wrapperClassName)}>
        <MotionImage
          pieces={pieces}
          imageUrl={images[currImgIdx]}
          animations={animation}
          animationDuration={animationDuration / 2}
          configView={configView}
          customDelayLogic={customDelayLogic}
          controlConfig={{
            isControlled: true,
            isAnimationStopped: false,
            reverse: false,
          }}
          delayLogic={delayLogic}
          totalDelay={totalDelay}
          isDynamicallyQueued={isDynamicallyQueued}
          motionFn={motionFn}
          wrapperClassName="w-full h-full"
          transition={transition}
          fallback={fallback}
          elementClassname={elementClassname}
        />
      </div>
    ),
    [
      currImgIdx,
      animation,
      images,
      wrapperClassName,
      pieces,
      enterAnimation,
      configView,
      controlConfig,
      customDelayLogic,
      delayLogic,
      totalDelay,
      isDynamicallyQueued,
      motionFn,
      transition,
      fallback,
      elementClassname,
    ]
  );
};

import dynamic from "next/dynamic";
import MotionImage from "./motion-image";

/**
 * ImageQueueContainer renders an animated image queue that cycles through an array of images
 * using enter and exit animations. The component updates the displayed image on a timer,
 * triggering animations for entering and exiting images. It relies on the MotionImage component
 * (dynamically imported) to render the animated image.
 *
 * @component
 * @param {ImageQueueProps} props - The props for configuring the image queue.
 * @param {string[]} [props.images=[]] - Array of image URLs to display.
 * @param {object} props.controlConfig - Configuration object to control the animation state.
 * @param {AnimationKeys|AnimationKeys[]} props.enterAnimation - Animation key(s) for the entering image.
 * @param {AnimationKeys|AnimationKeys[]} props.exitAnimation - Animation key(s) for the exiting image.
 * @param {string} [props.wrapperClassName="relative"] - Additional CSS classes for the outer wrapper.
 * @param {number} [props.animationDuration=2] - The duration (in seconds) of the animation cycle.
 * @param {object} [props.configView={ once: false, amount: "some" }] - Configuration for view-based triggering of animations.
 * @param {(index: number) => number} [props.customDelayLogic] - A custom function to calculate delay based on index.
 * @param {DelayLogic} [props.delayLogic="sinusoidal"] - The delay logic to apply (e.g., "linear", "sinusoidal").
 * @param {number} [props.pieces=121] - The number of pieces to segment the image into.
 * @param {string} [props.elementClassname] - Additional CSS classes for the animated element.
 * @param {React.ReactNode} [props.fallback=<div className="w-full h-full absolute bg-stone-950 animate-pulse" />] - Fallback element to display if no images are provided.
 * @param {boolean} [props.isDynamicallyQueued] - Whether the image queue operates dynamically.
 * @param {"click" | "hover"} [props.motionFn] - The event type to trigger motion interactions.
 * @param {number} [props.totalDelay=0] - Total delay applied to the animation sequence.
 * @param {string} [props.transition="smooth"] - The transition type to use for animations.
 * @returns {JSX.Element} The rendered ImageQueueContainer component.
 */
const MotionImageQueue = dynamic(
  () =>
    Promise.resolve(memo(ImageQueueContainer as typeof ImageQueueContainer)),
  { ssr: false }
);

export default MotionImageQueue;
`,
    desc: `Now, navigate to the 'motion-image-queue.tsx' file and paste the code shown below once again. I swear this is the last time.`,
    lang: "typescript",
    title: "<MotionImageQueue />",
  },
  {
    id: 20,
    render: `MotionProvider/
├── motion-container.tsx
├── motion-image-queue.tsx
├── motion-image.tsx
├── motion-queue.tsx
├── hooks/
│   ├── use-animation-mixer.tsx
│   └── use-animation.tsx
├── lib/
│   ├── animate.lib.ts
│   └── transitions.lib.ts
├── types/
│   └── index.ts
└── utils/
    └── calculateDelay.ts`,
    desc: `Now, navigate to the root of 'MotionProvider' for the last time and create a new file called 'motion-queue.tsx'. After that, your directory must look like this:`,
    lang: "typescript",
    title: "Landlord component motion-queue.tsx",
  },
  {
    id: 21,
    render: `import {
  AnimationQueueProps,
  DelayLogic,
  ViewAnimationControllerProps,
} from "./types";
import { Children, FC, memo, useMemo } from "react";
import { calculateDelay } from "./utils/calculateDelay";
import MotionContainer from "./motion-container";
import { cn } from "@/lib/utils";

const QueueContainer: FC<
  AnimationQueueProps & {
    delayLogic?: DelayLogic;
    customLogic?: (index: number) => number;
  }
> = ({
  animations,
  children,
  className,
  elementType = "div",
  isDynamicallyQueued = false,
  delayByElement,
  duration = 0.5,
  delayLogic = "linear",
  customLogic,
}) => {
  const compute = useMemo(() => {
    if (isDynamicallyQueued) {
      return children.map((_, index) => {
        const calculatedDelay = calculateDelay({
          delayLogic,
          index,
          baseDuration: duration,
          customLogic,
        });
        return {
          ...animations[index],
          delay: delayByElement || calculatedDelay,
        };
      });
    }
    return animations.map((animation, idx) => ({
      ...animation,
      delay:
        delayByElement ??
        calculateDelay({
          delayLogic: "custom",
          index: idx,
          baseDuration: duration,
          customLogic,
        }),
    }));
  }, [animations, children, delayLogic, delayByElement, duration, customLogic]);

  const childItem = useMemo(() => Children.toArray(children), [children]);

  if (animations.length !== children.length) {
    console.warn(
      "MotionQueue ERROR: Animations and children arrays should have the same length."
    );
    return null;
  }

  return (
    <>
      {compute.map((animation, index) => (
        <MotionContainer
          key={index}
          delay={animation.delay}
          {...(animation as ViewAnimationControllerProps)}
          elementType={elementType}
          className={cn(className)}
        >
          {childItem[index]}
        </MotionContainer>
      ))}
    </>
  );
};
import dynamic from "next/dynamic";

/**
 * QueueContainer is a component that renders a queue of animated child elements.
 *
 * It maps each child element with a corresponding animation configuration. The delay for each animation
 * is calculated based on the provided 'delayLogic', a custom function ('customLogic'), and/or a fixed delay ('delayByElement').
 * When 'isDynamicallyQueued' is true, the delay is computed dynamically for each child; otherwise, a custom delay logic is used.
 *
 * If the number of animations does not match the number of children, a warning is logged and the component renders nothing.
 *
 * @component
 * @param {AnimationQueueProps & { delayLogic?: DelayLogic, customLogic?: (index: number) => number }} props - The component props.
 * @param {Array} props.animations - Array of animation configuration objects.
 * @param {React.ReactNode} props.children - The child elements to animate.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {string} [props.elementType="div"] - The HTML element type to be used in the MotionContainer.
 * @param {boolean} [props.isDynamicallyQueued=false] - If true, delays are calculated dynamically for each element.
 * @param {number} [props.delayByElement] - Fixed delay to override the calculated delay for each element.
 * @param {number} [props.duration=0.5] - Base duration used for calculating the delay.
 * @param {DelayLogic} [props.delayLogic="linear"] - The logic used to calculate the delay (e.g., "linear", "sinusoidal", etc.).
 * @param {(index: number) => number} [props.customLogic] - Custom function to calculate delay given the element's index.
 * @returns {JSX.Element|null} The rendered queue of animated elements or null if the animations and children arrays have mismatched lengths.
 */
const MotionQueue = dynamic(
  () => Promise.resolve(memo(QueueContainer as typeof QueueContainer)),
  { ssr: false }
);

export default MotionQueue;
`,
    desc: `Finally we came at the and. Just copy and paste the code shown below into our 'motion-queue.tsx' file. If you did everything following to the instructions, you might not have any errors.`,
    lang: "typescript",
    title: "<MotionQueue />",
  },
  {
    id: 22,
    render: `import MotionContainer from "@/components/MotionProvider/motion-container";

const Experiment = () => {
  return (
    <MotionContainer
      mode={["filterBlurIn", "fadeRight"]}
      configView={{ once: true, amount: 0.5 }}
      elementType={"div"}
      duration={1}
      transition="smooth"
    >
      <h2 className="pt-12 lg:text-3xl font-bold">
        Hello World
      </h2>
    </MotionContainer>
  );
}`,
    desc: `I know it took a while to complete, but you did it! Now let's test that you really did or not, copy this example animation and paste some please in your one of next.js app/page file and see how the magic comes true.`,
    lang: "typescript",
    title: "Wooow, you actually did it lord.",
  },
] as RadarItem[];
