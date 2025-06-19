import ContainerNested from "@/components/Documentation/centralized/prototypes/container-nested";
import MotionRenderer from "@/components/Documentation/centralized/prototypes/motion-renderer";
import ContainerDelayedRotateIn from "@/components/Experiments/container-delayed-rotate-in";
import ContainerFadeIn from "@/components/Experiments/container-fade-in";
import ImageMotionFadeIn from "@/components/Experiments/image-motion-fade-in";
import ImageMotionHovered from "@/components/Experiments/image-motion-hovered";
import ImageMotionMovie from "@/components/Experiments/image-motion-movie";
import QueueFadeIn from "@/components/Experiments/queue-fade-in";
import QueueTextTyping from "@/components/Experiments/queue-text-typing";
import MotionQueue from "@/components/MotionProvider/motion-queue";

import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";

import { useIsMobile } from "@/hooks/use-mobile";
import { MotionRendererItem, ReduxThemeProps } from "@/interfaces";
import examplesLib from "@/lib/examples.lib";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { useSelector } from "react-redux";

const children: MotionRendererItem["child"][] = [
  <ContainerFadeIn />,
  <ContainerDelayedRotateIn />,
  <QueueFadeIn />,
  <QueueTextTyping />,
  <ContainerNested />,
  <ImageMotionFadeIn />,
  <ImageMotionHovered />,
  <ImageMotionMovie />,
  <BuyMeCoffee />,
];

export default function MotionProviderExamples() {
  const isMobile = useIsMobile();
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );
  const animations = examplesLib.map((_, idx) => {
    return {
      mode: idx % 2 === 0 ? "fadeLeft" : "fadeRight",
      duration: 1,
      transition: "smooth",
    } as AnimationQueueAnimationProps;
  });
  return (
    <>
      <Head>
        <title>Motion Provider - Examples</title>
        <meta
          name="description"
          content="Discover practical examples to kickstart your animations."
        />
        <meta property="og:title" content="Motion Provider - Examples" />
        <meta
          property="og:description"
          content="Discover practical examples to kickstart your animations."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://motion-provider.vercel.app/motion-provider/examples"
        />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <h1 className="text-3xl font-bold lg:mt-4">
        Examples of Motion Provider
      </h1>
      <p className="pb-8 pt-2 text-sm text-muted-foreground">
        Copy and directly paste to your project. You did not like the animation?
        Then go to engines and create your own animation in couple clicks! To
        view the source code please press the expand button. the animation press
        the reset button.
      </p>
      <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MotionQueue
          duration={0.5}
          elementType={"div"}
          children={examplesLib.map((item, idx) => (
            <MotionRenderer
              key={idx}
              contentClassName={item.contentClassName}
              code={item.code}
              desc={item.desc}
              isMobile={isMobile}
              theme={appTheme}
              wrapperClassName={cn(
                "bg-[url(/assets/components/code-viewer-bg.webp)] dark:bg-[url(/assets/components/code-engine-bg-1.webp)]  bg-no-repeat bg-center bg-cover rounded-lg h-48 items-center justify-center flex",
                item.wrapperClassName
              )}
            >
              {children[idx]}
            </MotionRenderer>
          ))}
          animations={animations as AnimationQueueAnimationProps[]}
          isDynamicallyQueued
        />
      </div>
    </>
  );
}
