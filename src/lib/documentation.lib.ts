import { DocumentationProps } from "@/interfaces";

export default {
  motionProviderCompare: {
    code: `import MotionContainer from "@/components/MotionProvider/motion-container";
import { FC } from "react";

export const Experiment: FC = () => {
  return (
    <MotionContainer
      mode={["filterBlurIn", "fadeRight"]}
      configView={{ once: false, amount: 0.5 }}
      elementType={"div"}
      duration={1}
      transition="smooth"
    >
      <h2 className="pt-12 lg:text-3xl font-bold">
        Hello World
      </h2>
    </MotionContainer>
  );
};`,
    desc: "Example Of Motion Provider",
  },
  framerCompare: {
    code: `import { motion as m, useInView } from "motion/react";
import { FC, useRef } from "react";

export const Experiment: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const variants = {
    initial: { opacity: 0, filter: "blur(10px)", x: 30 },
    animate: { opacity: 1, filter: "blur(0px)", x: 0 },
  };

  return (
    <m.div
      ref={ref}
      animate={isInView ? variants.animate : variants.initial}
      initial={variants.initial}
      variants={variants}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <h2 className="pt-12 lg:text-3xl font-bold">
        Hello World
      </h2>
    </m.div>
  );
};`,
    desc: "Example Of Motion(framer-motion)",
  },
  motionSimple: {
    code: `<MotionContainer
  mode={["filterBlurIn", "fadeRight", "burakHeartbeat"]}
  elementType="div"
  duration={1}
  transition="smooth"
  children="Hello World"
>`,
    desc: "Motion Provider",
  },
  framerSimple: {
    code: `<motion.div
  initial={{ scale: 1, opacity: 0, x: 30, filter: "blur(10px)" }}
  animate={{ scale: [1, 1.2, 1], opacity: 1, x: 0, filter: "blur(0px)" }}
  transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
>
    Hello World
</motion.div>`,
    desc: "Motion",
  },
  next: {
    code: "npx create-next-app@latest",
    desc: "bash",
  },
  prerequired: {
    code: "npm i motion lodash clsx tailwind-merge",
    desc: "bash",
  },
  installation: {
    code: "npx motion-provider@latest",
    desc: "bash",
  },
  rootDirectory: {
    code: `MotionProvider/
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
    └── calculateDelay.ts
`,
  },
  cn: {
    code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  },
  basicMotionUsage: {
    code: `import MotionContainer from "@/components/MotionProvider/motion-container";
import { FC } from "react";

export const Experiment: FC = () => {
  return (
    <MotionContainer
      mode="fadeUp"
      elementType="div"
      configView={{ once: false, amount: 0.5 }}
      transition="smooth"
      delay={0.2}
    >
      <h1>Animated Content</h1>
    </MotionContainer>
  );
}`,
  },
  animationModes: {
    code: `// Single animation
mode="slideDown"

// Combined animations
mode={["rotateFlipY", "fadeIn", "filterBlurIn"]}

// Conditional animations
mode={isVisible ? "fadeIn" : "fadeOut"}

// Dynamic animations (assuming you have an index variable)
mode={index % 2 === 0 ? ["filterBlurIn", "fadeRight"] : ["filterBlurIn", "fadeLeft"]}
`,
  },
  simpleMotionQueueExample: {
    code: `import MotionQueue from "@/components/MotionProvider/motion-queue";
import { FC } from "react";

export const Experiment: FC = () => {
    return (
      <MotionQueue
        elementType="div"
        duration={1}
        isDynamicallyQueued
        animations={[
          {
            mode: ["filterBlurIn", "fadeRight"],
            duration: 1,
            transition: "smooth",
          },
        ]}
      >
        <h2 className="pt-12 lg:text-3xl font-bold">
          Hello World
        </h2>
      </MotionQueue>
    );
}
`,
  },
  delayLogicExample: {
    code: `//use predefined delay logic inside MotionQueue as follows 
isDynamicallyQueued + delayLogic: "linear" | "exponential" | "sinusoidal"

//or create custom delay logic inside MotionQueue as follows (assuming you have an index variable)
isDynamicallyQueued  + customDelayLogic = (index: number) => {
  return index * 0.5

//or use fixed delay logic with this
delayByElement: 1  
  `,
  },
  useAnimationMixer: {
    code: `const { initial, animate } = useAnimationMixer({
  animations: DEFINE_YOUR_ANIMATIONS_HERE as AnimationObjProps[],
  //Specify true to reverse the animations (creates a mirror effect by reversing the order of the animations with opacity effect)
  reverse: true,
});`,
  },
  useAnimation: {
    code: `const animationConfig = useAnimation({
  stopAnimation,
  reverseAnimation,
  recallDuration: 1,
});`,
  },
  imageMotionBasic: {
    code: `import MotionImage from "@/components/MotionProvider/motion-image";
import { FC } from "react";

export const Example: FC = () => (
    <MotionImage
        pieces={144}
        isDynamicallyQueued
        animationDuration={1}
        delayLogic="sinusoidal"
        transition="smooth"
        imageUrl={ADD_YOUR_IMAGE_HERE}
        wrapperClassName="w-full h-full"
        animations={["fadeIn"]}
    />
)`,
  },
  motionImageQueue: {
    code: `import MotionImageQueue from '@/components/MotionProvider/motion-image-queue';

const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg"
];

export default function App() {
  return (
    <MotionImageQueue
      images={images}
      enterAnimation={["fadeIn", "scaleZoomIn"]}
      exitAnimation={["fadeOut"]}
      isDynamicallyQueued={true}
      animationDuration={2}
      pieces={121}
      configView={{ once: false, amount: 0.5 }}
      delayLogic="sinusoidal"
      totalDelay={0}
      transition="smooth"
    />
  );
}`,
    desc: "MotionImageQueue",
  },
  casBasicImplementation: {
    code: `asd`,
    desc: "bash",
  },
  casIntegrationExample: {
    code: `casIntegrationExample`,
    desc: "bash",
  },
  casHookAnatomy: {
    code: `casHookAnatomy`,
    desc: "bash",
  },
  casAnotomyCode1: {
    code: `import MotionImage from "@/components/MotionProvider/motion-image";
import { FC } from "react";

export const Example: FC = () => {
  return (
    <MotionImage
      pieces={144}
      isDynamicallyQueued
      animationDuration={1}
      delayLogic="sinusoidal"
      transition="smooth"
      imageUrl={ADD_YOUR_IMAGE_HERE}
      wrapperClassName="w-full lg:h-96 h-60"
      animations={["fadeIn", "filterBlurIn"]}
    />
  )
}`,
    desc: "<MotionImage />",
  },
  casAnotomyCode2: {
    code: `const [stopAnimation, setStopAnimation] = useState<boolean>(false);
const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);

const config = useAnimation({
  stopAnimation,
  reverseAnimation,
  recallDuration: 1,
});

const handleReverse = () => {
  setReverseAnimation((prev) => !prev);
  setStopAnimation(false);
};

const handleStop = () => {
  setStopAnimation(true);
  setReverseAnimation(false);
};`,
    desc: "useAnimation()",
  },
  casAnotomyCode3: {
    code: `import { FC, useState } from "react";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import MotionImage from "@/components/MotionProvider/motion-image";

export const Example: FC = () => {
  const [stopAnimation, setStopAnimation] = useState<boolean>(false);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);

  // Here we initialize the useAnimation hook to centralize the animations. 
  // USE THIS LOGIC IN ANY CASE WHERE YOU WANT TO CONTROL THE ANIMATIONS FOR PERFORMANCE!   
  const config = useAnimation({
    stopAnimation,
    reverseAnimation,
    recallDuration: 1,
  });

  // Keep the logic as shown while you reversing the animation.
  const handleReverse = () => {
    setReverseAnimation((prev) => !prev);
    setStopAnimation(false);
  };

  // Keep the logic as shown while you stopping the animation.
  // It will work only when the state momently reversed or while any animation in use. 
  const handleStop = () => {
    setStopAnimation(true);
    setReverseAnimation(false);
  };

  return (
    <div className="w-full lg:h-96 h-60">
      <div className="absolute top-12 right-6 z-50 items-start  justify-center flex flex-col gap-2">
        <button onClick={handleStop} className="bg-black px-4 py-2 rounded-lg">
          {config.isAnimationStopped ? "Start" : "Stop"}
        </button>
        <button onClick={handleReverse} className="bg-black px-4 py-2 rounded-lg">
          {config.reverse ? "Start" : "Reverse"}
        </button>
      </div>
      <MotionImage
        pieces={144}
        isDynamicallyQueued
        // Pass the centralized animation config into any MotionProvider component
        controlConfig={{
          isControlled: true,
          ...config,
        }}
        animationDuration={2.1}
        delayLogic="sinusoidal"
        transition="fadeSlide"
        imageUrl={YOUR_IMAGE_URL}
        wrapperClassName="w-full h-1/2"
        animations={["rotateFlipY","rotateRoll"]}
      />
    </div>
  );
};
`,
    desc: "<MotionImage />",
  },
  casAnotomyCode4: {
    code: `import { FC, useState } from "react";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import MotionContainer from "@/components/MotionProvider/motion-container";

export const Example: FC = () => { 
  // Change the state manually because I am exhausted of writing documentation.
  // But maybe you can buy me a coffee and I can continue with the documentation :)
  // Guys really I spent  +60 hours on this with 100% effort and I am not earning anything from this...
  // So If you support me then we can make the internet looking better!
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);

  // We set just reverseAnimation, because we does not want to stop it.
  const config = useAnimation({
    stopAnimation: false,
    reverseAnimation,
    recallDuration: 1,
  });

  //In this time we do not need to stop the animation so we do not need to set stopAnimation.

  return (
      <MotionContainer
        elementType="div"
        {...config}
        configView={{ once: true, amount: "some" }}
        mode={["rotateFlipX", "fadeDown"]}
        transition="smooth"
        duration={1}
        className="w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500"
        delay={0}
      />
  )
}`,
    desc: "<MotionContainer />",
  },
} as DocumentationProps;
