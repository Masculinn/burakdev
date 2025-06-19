import { MotionRendererItem } from "@/interfaces";

export default [
  {
    code: `import MotionContainer from "@/components/MotionProvider/motion-container";

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
}
`,
    desc: "Example Of Motion Container",
  },
  {
    code: `import MotionContainer from "@/components/MotionProvider/motion-container";

const Experiment = () => {
  return (
    <MotionContainer
        elementType="div"
        configView={{ once:true, amount:"some" }}     
        mode={["rotateFlipX","fadeDown"]}
        transition="smooth"
        duration={1}
        className="w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500"
        delay={0.5}
     />
  );
}`,
    desc: "Delayed div rotate animation",
  },
  {
    code: `import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";

const Experiment = () => {
  const rightFadeInMode = ["filterBlurIn", "fadeRight"];
  const leftFadeInMode = ["filterBlurIn", "fadeLeft"];

  const animations = Array.from({ length: 4 }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 0.5,
    configView: { once: false, amount: 0.5 },
    reverse: false,
    delay: index * 0.1, 
    transition: "smooth",
  })) as AnimationQueueAnimationProps[];

  return (
    <MotionQueue
      duration={0.5}
      elementType="div"
      animations={animations}
      isDynamicallyQueued
    >
      {Array.from({ length: animations.length }).map((_, idx) => (
        <span key={idx}>
          Hello There!
        </span>
      ))}
    </MotionQueue>
  );
}`,
  },
  {
    code: `import { FC } from "react";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import MotionQueue from "../MotionProvider/motion-queue";

const text = "Animate Like A Pro!".split(/\\s+/);

const QueueTextTyping: FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <MotionQueue
        elementType={"h2"}
        animations={
          Array.from({ length: text.length }).fill({
            mode: ["filterBlurIn", "fadeRight"],
            duration: 1,
            configView: { once: false, amount: 0.5 },
          }) as AnimationQueueAnimationProps[]
        }
        isDynamicallyQueued
        children={text}
        delayLogic="linear"
        className="font-bold lg:text-3xl text-xl tracking-tight"
        duration={0.5}
      />
    </div>
  );
};

export default QueueTextTyping;`,
    desc: "Typing effect with MotionQueue",
  },
  {
    code: `import { ViewAnimationControllerProps } from "@/components/MotionProvider/types";
import MotionContainer from "@/components/MotionProvider/motion-container";
import { FC } from "react";

interface NestedAnimationProps {
  config: Partial<ViewAnimationControllerProps[]>;
  children?: React.ReactNode;
}

const NestedAnimation: FC<NestedAnimationProps> = ({ config, children }) => {
  const animations = (currIdx: number): React.ReactNode => {
    if (currIdx >= config.length) return children;

    const currConfig = config[currIdx];

    return (
      <MotionContainer
        {...currConfig}
        elementType={currConfig?.elementType || "div"}
        configView={currConfig?.configView || { once: true, amount: "some" }}
        mode={currConfig?.mode || []}
      >
        {animations(currIdx + 1)}
      </MotionContainer>
    );
  };

  return animations(0);
};

const Experiment = () => {
  const config = [
    {
      elementType: "div",
      configView: { once: true, amount: "some" },
      mode: ["spin", "fadeIn", "filterBlurIn"],      
      transition: "cubicElastic",
      duration: 1,
      className:
        "w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 items-center justify-center flex",
      delay: 0.5,
    },
    {
      elementType: "div",
      configView: { once: true, amount: "some" },
      mode: ["rotateFlipY", "filterBlurIn", "fadeIn"],
      transition: "smooth",
      duration: 1,
      className:
        "w-2/3 h-2/3 rounded-lg bg-gradient-to-l from-rose-500 via-fuchsia-500 to-cyan-400 items-center justify-center flex",
      delay: 1.5,
    },
    {
      elementType: "div",
      configView: { once: true, amount: "some" },
      mode: ["rotateFlipX", "fadeUp", "elasticBounce"],
      transition: "smooth",
      duration: 1,
      className:
        "w-1/2 h-1/2 rounded-lg bg-gradient-to-l from-yellow-500 via-rose-500 to-cyan-400",
      delay: 2.5,
    },
    //add as many as you want while considering performance metrics :)
  ] as NestedAnimationProps["config"];

  return <NestedAnimation config={config} />;
}`,
    desc: "Nested Animation with MotionContainer",
  },
  {
    code: `import MotionImage from "@/components/MotionProvider/motion-image";

const Experiment = () => {
  return (
      <MotionImage
        animations={["translate3dIn", "fadeIn", "filterBlurIn"]}
        imageUrl="tree"
        pieces={144}
        animationDuration={1}
        delayLogic="sinusoidal"
        isDynamicallyQueued
        transition="slowElastic"
        fallback={<div className="w-full h-full absolute top-0 left-0 animate-pulse" />}
        wrapperClassName="w-full h-full absolute top-0 left-0"
      />
  );
};

export default Experiment;`,
    contentClassName: "w-full h-full absolute top-0 left-0 z-50 bg-transparent",
    desc: "MotionImage translate3D",
  },
  {
    code: `import MotionImage from "@/components/MotionProvider/motion-image"

const Experiment = () => {
  return (
      <MotionImage      
        isDynamicallyQueued
        totalDelay={2.2}
        animationDuration={2}
        delayLogic="sinusoidal"
        transition="cubicBounce"
        imageUrl="/assets/presets/fractal.webp"
        pieces={144}
        wrapperClassName="w-full h-full"
        animations={["rotateIn", "fadeIn", "filterBlurIn"]}
        motionFn="hover"
      />
  );
};

export default Experiment;`,
    contentClassName: "w-full h-full absolute top-0 left-0 z-50 bg-transparent",
    desc: "MotionImage Hover Function",
  },
  {
    code: `import MotionImageQueue from "@/components/MotionProvider/motion-image-queue";

const Experiment = () => {
  return (
     <MotionImageQueue
      isDynamicallyQueued
      animationDuration={4}
      configView={{ once: true, amount: "some" }}
      delayLogic="sinusoidal"
      fallback={<Skeleton className="bg-transparent w-full h-full absolute" />}
      totalDelay={0}
      transition="smooth"
      enterAnimation={["fadeIn", "filterBlurIn"]}
      exitAnimation={["fadeOut", "spin"]}
      pieces={121}
      images={[
        "https://images.unsplash.com/photo-1737917818689-f3b3708de5d7?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
      ]}
    />
  );
};

export default Experiment;`,
    contentClassName: "w-full h-full absolute top-0 left-0 z-50 bg-transparent",
    desc: "MotionImageQueue Animation Movie",
  },
  {
    code: `import React, { useRef } from "react";
import MotionImage from "@/components/MotionProvider/motion-image";
import MotionImageQueue from "@/components/MotionProvider/motion-image-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import Link from "next/link";

const headerText = "Buy Me A Coffee!";

export const BuyMeCoffee = () => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const animations = ["filterBlurIn", "fadeRight", "cubicElastic"];

  return (
    <Link
      target="_blank"
      ref={ref}
      href={ADD_YOUR_LINK}
      className="inline-flex items-center h-8 leading-loose no-underline text-white bg-[#FF813F] rounded-[5px] border border-transparent py-[0.7rem] px-4 text-[2rem] tracking-[0.6px] shadow-[0px_1px_2px_rgba(190,190,190,0.5)] transition-all duration-300 ease-linear font-[cursive] hover:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] hover:opacity-85 focus:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] focus:opacity-85 active:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] active:opacity-85 relative lg:scale-100 scale-90"
    >
      <MotionImage
        isDynamicallyQueued
        totalDelay={0.5}
        animationDuration={1}
        delayLogic="sinusoidal"
        transition="cubicElastic"
        imageUrl={"https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"}
        pieces={64}
        elementClassname="h-full w-full shadow-none border-none"
        wrapperClassName="h-[25px] w-[27px] shadow-none border-none"
        animations={["rotating360", "translate3dIn"]}
        controlConfig={{
          isControlled: true,
          reverse: false,
          isAnimationStopped: false,
        }}
      />
      <div className="flex font-mono flex-row gap-1 ml-[15px] h-auto text-center">
        <MotionQueue
          key={2}
          elementType="span"
          duration={0.1}
          delayLogic="linear"
          isDynamicallyQueued
          className="text-sm tracking-tight text-center"
          animations={
            Array.from({ length: headerArr.length }).fill({
              mode: animations,
              transition: "cubicBounce",
              duration: 1,
            }) as AnimationQueueAnimationProps[]
          }
          children={headerArr.map((val) => val)}
        />
      </div>
    </Link>
  );
};`,
    desc: "Animated Coffee Button",
  },
] as Omit<MotionRendererItem, "child">[];
