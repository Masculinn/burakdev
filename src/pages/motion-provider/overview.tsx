import { Lightbulb, Pause, SkipBack, SkipForward } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useInView } from "motion/react";
import { useSelector } from "react-redux";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AnimationQueueAnimationProps,
  MotionTextKeywordsProps,
} from "@/components/MotionProvider/types";
import { ReduxThemeProps } from "@/interfaces";
import { Geist_Mono } from "next/font/google";
import React, { Fragment, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { BannerCard } from "@/components/banner-card";
import MotionText from "@/components/Documentation/centralized/prototypes/motion-text";
import text from "@/lib/motion-text.lib";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import MotionContainer from "@/components/MotionProvider/motion-container";
import CodeProvider from "@/components/Documentation/code-provider";
import documentationLib from "@/lib/documentation.lib";
import MotionImage from "@/components/MotionProvider/motion-image";
import { CodeBadge } from "@/components/Documentation/code-badge";

const geist = Geist_Mono({ subsets: ["latin"], weight: "600" });

const blogTitle = "Create stunned applications.".split(/\s+/);

interface BlogListItem {
  title: string;
  desc: React.ReactNode[];
  src: string;
  url: string;
}
const blogList: BlogListItem[] = [
  {
    title: "SaaS SPA App",
    desc: [
      "✅ Learn motion state.",
      "✅ Learn advanced image motioning.",
      "✅ Learn composition.",
      <div className="flex flex-wrap pt-4 gap-2">
        <CodeBadge code="MotionImage" />
        <CodeBadge code="MotionImageQueue" />
        <CodeBadge code="MotionQueue" />
        <CodeBadge code="MotionContainer" />
      </div>,
    ],
    src: "/assets/projects/thumbs/saas-thumb.gif",
    url: "/projects/saas",
  },
  {
    title: "Crypto Landing App",
    desc: [
      "✅ Learn CAS.",
      "✅ Learn advanced controlling.",
      "✅ Learn coloured animations.",
      <div className="flex flex-wrap pt-4 gap-2">
        <CodeBadge code="useAnimation" />
        <CodeBadge code="MotionImage" />
        <CodeBadge code="MotionQueue" />
        <CodeBadge code="MotionContainer" />
      </div>,
    ],
    src: "/assets/projects/thumbs/crypto-thumb.gif ",
    url: "/projects/crypto",
  },
  {
    title: "Agency Landing App",
    desc: [
      "✅ Learn color bounding.",
      "✅ Learn text animations.",
      "✅ Learn synchronized animations.",
      "✅ Learn CAS.",
      <div className="flex flex-wrap pt-4 gap-2">
        <CodeBadge code="MotionContainer" />
        <CodeBadge code="MotionImage" />
        <CodeBadge code="MotionQueue" />
      </div>,
    ],
    src: "/assets/projects/thumbs/agency-thumb.gif",
    url: "/projects/agency",
  },
  {
    title: "NFT Landing App",
    src: "/assets/projects/thumbs/nft-thumb.gif",
    desc: [
      "✅ Learn z-* animations.",
      "✅ Learn synchronized animations.",
      "✅ Learn layout animations.",
      <div className="flex flex-wrap pt-4 gap-2">
        <CodeBadge code="MotionContainer" />
        <CodeBadge code="MotionImage" />
        <CodeBadge code="MotionQueue" />
      </div>,
    ],
    url: "/projects/nft",
  },
];
const keywords = [
  {
    word: "because",
    animation: ["fadeIn", "filterBlurIn"],
  },
  {
    word: "you-deserve",
    animation: ["fadeUp"],
  },
  {
    word: "minimalistic",
    animation: ["fadeUp", "filterBlurIn"],
  },
  {
    word: "simple",
    animation: ["fadeUp"],
  },
  {
    word: "api's",
    animation: ["fadeUp", "filterBlurIn"],
  },
  {
    word: "to-animate",
    animation: ["fadeUp", "filterBlurIn"],
  },
  {
    word: "everything",
    animation: ["fadeUp"],
  },
];

export default function Overview() {
  const [stopAnimation, setStopAnimation] = useState<boolean>(false);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );
  const animationConfig = useAnimation({
    stopAnimation,
    reverseAnimation,
    recallDuration: 1,
  });

  const isMobile = useIsMobile();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: "some" });

  const framerStyle = `${geist.className} bg-gradient-to-r from-yellow-400 to-amber-400 text-transparent bg-clip-text`;
  return (
    <>
      <Head>
        <title>Motion Provider</title>
        <meta
          name="description"
          content="Accelerate your React component animations by up to 4x with seamless performance and precision, built entirely in React and TypeScript for a smooth, type-safe development experience. Powered by Motion Provider"
        />
        <meta property="og:title" content="Motion Provider" />
        <meta
          property="og:description"
          content="Accelerate your React component animations by up to 4x with seamless performance and precision, built entirely in React and TypeScript for a smooth, type-safe development experience. Powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider"
        />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <div
        className="absolute lg:top-16 lg:right-8 items-center flex lg:flex-col flex-row gap-2 tracking-tighter top-0 right-0 w-full lg:w-auto z-50"
        ref={ref}
      >
        <Button
          onClick={() => {
            setReverseAnimation((prev) => !prev);
            setStopAnimation(false);
          }}
          variant={"default"}
          className="lg:w-52 lg:text-sm text-xs w-full h-8 "
          size="sm"
        >
          <span>
            {animationConfig.reverse
              ? "Start Animations"
              : "Reverse Animations"}
          </span>
          {animationConfig.reverse ? <SkipForward /> : <SkipBack />}
        </Button>
        <Button
          onClick={() => {
            setStopAnimation(true);
            setReverseAnimation(false);
          }}
          variant={"secondary"}
          className="lg:w-52 lg:text-sm text-xs w-full h-8"
        >
          {animationConfig.isAnimationStopped
            ? "Start Animating"
            : "Stop Animating"}
          <SkipForward />
        </Button>
      </div>
      <MotionContainer
        elementType={"div"}
        configView={{ once: false, amount: "some" }}
        mode={
          !isInView ? ["filterBlurIn", "fadeIn"] : ["filterBlurOut", "fadeOut"]
        }
        transition="cubicFastEnd"
        duration={0.5}
        className="
        fixed 
        left-1/2 
        transform 
        -translate-x-1/2 
        translate-y-1/2 
        dark:bg-white
        dark:text-black
        text-white
        bg-neutral-900
        backdrop-blur-sm 
        z-50 
        flex 
        items-center 
        justify-center
        lg:bottom-16 
        bottom-12 
        h-12 
        lg:w-80
        w-48
        rounded-2xl
        flex-row
        gap-2
        border-2 
        border-neutral-800
        "
      >
        <MotionQueue
          elementType={"div"}
          duration={1}
          delayLogic="linear"
          isDynamicallyQueued
          animations={[
            {
              mode: !isInView
                ? ["rotateClockwise", "fadeIn"]
                : ["rotateRoll", "fadeOut"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: !isInView
                ? ["rotateClockwise", "fadeIn"]
                : ["rotateRoll", "fadeOut"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: !isInView
                ? ["rotateClockwise", "fadeIn"]
                : ["rotateRoll", "fadeOut"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
          ]}
          children={[
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={1}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setReverseAnimation((prev) => !prev);
                      setStopAnimation(false);
                    }}
                    variant={"ghost"}
                    className="text-xs rounded-full"
                    key="skip"
                  >
                    {animationConfig.reverse ? <SkipForward /> : <SkipBack />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {animationConfig.reverse
                      ? "Start Animations"
                      : "Reverse Animations"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={2}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setStopAnimation(true);
                      setReverseAnimation(false);
                    }}
                    variant={"ghost"}
                    className="text-xs rounded-full"
                    key="stop"
                  >
                    {animationConfig.isAnimationStopped ? (
                      <SkipForward />
                    ) : (
                      <Pause />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {animationConfig.isAnimationStopped
                      ? "Show Animations"
                      : "Skip Animations"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={2}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/motion-provider/centralized-animation-system">
                    <Button
                      onClick={() => {
                        setStopAnimation(true);
                        setReverseAnimation(false);
                      }}
                      variant={"ghost"}
                      className="text-xs rounded-full"
                      key="stop"
                    >
                      <Lightbulb />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How this works?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
          ]}
        />
      </MotionContainer>
      <BannerCard
        description="An animation provider API for motion by Burak Bilen"
        title="Motion Provider."
        controlConfig={{
          isAnimationStopped: animationConfig.isAnimationStopped,
          isControlled: true,
          reverse: animationConfig.reverse,
        }}
        className="mt-4 lg:mt-0"
        duration={1}
        theme={appTheme}
        delayed={0.25}
      />
      <MotionContainer
        mode={["filterBlurIn", "fadeRight"]}
        configView={{ once: true, amount: 0.5 }}
        elementType={"div"}
        delay={0.75}
        {...animationConfig}
        duration={1}
        transition="smooth"
      >
        <h2 className="pt-12 lg:text-3xl font-bold text-lg tracking-tighter lg:tracking-tight">
          Introduction To Motion Provider
        </h2>
      </MotionContainer>
      <p className="tracking-tight  dark:text-neutral-300  text-base pt-4 lg:pt-6">
        I know{" "}
        <MotionContainer
          elementType={"span"}
          {...animationConfig}
          configView={{ once: true, amount: 0.5 }}
          mode={["filterBlurIn", "fadeIn"]}
          transition="smooth"
          children={"animations"}
          className="bg-gradient-to-r font-bold from-cyan-400 to-blue-500 text-transparent bg-clip-text"
          delay={1}
        />
        {"  "}
        are
        {"  "}
        <MotionContainer
          elementType={"span"}
          {...animationConfig}
          configView={{ once: true, amount: 0.5 }}
          mode={["filterBlurIn", "fadeIn"]}
          transition="smooth"
          className="bg-gradient-to-r font-bold from-cyan-400 to-blue-500 text-transparent bg-clip-text"
          children={"challenging to implement"}
          delay={1.25}
        />{" "}
        as well as finding the right library to suit your needs, creating
        animations for different elements and components, and managing them
        consistently across your application can be time-consuming and require
        significant effort and patience. This is where{" "}
        <MotionContainer
          elementType={"code"}
          {...animationConfig}
          configView={{ once: true, amount: 0.5 }}
          mode={["filterBlurIn", "fadeIn"]}
          transition="smooth"
          className="bg-gradient-to-r font-bold from-cyan-400 to-blue-500 text-transparent bg-clip-text"
          children={"<MotionContainer />"}
          delay={1.5}
        />{" "}
        and{" "}
        <MotionContainer
          elementType={"code"}
          {...animationConfig}
          configView={{ once: true, amount: 0.5 }}
          mode={["filterBlurIn", "fadeIn"]}
          transition="easeIn"
          className="bg-gradient-to-r from-cyan-400 font-bold to-blue-500 text-transparent bg-clip-text"
          children={"useAnimationMixer()"}
          delay={1.75}
        />{" "}
        comes in. It’s a highly customizable,{" "}
        <Link
          href={"https://motion.dev/docs/react-use-in-view"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MotionContainer
            elementType={"span"}
            {...animationConfig}
            configView={{ once: true, amount: 0.5 }}
            mode={["filterBlurIn", "fadeIn"]}
            transition="easeIn"
            className={` underline underline-offset-2 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text`}
            children={"using a tiny (0.6kb) hook from motion"}
            delay={2}
          />
        </Link>{" "}
        and lightning-fast React component built to simplify the process of
        adding sophisticated animations. Leveraging the{" "}
        <Link
          href="https://motion.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MotionContainer
            elementType={"code"}
            {...animationConfig}
            configView={{ once: true, amount: 0.5 }}
            mode={["filterBlurIn", "fadeIn", "wave"]}
            transition="slowSmooth"
            className="font-bold"
            delay={2.25}
          >
            <span className="text-yellow-300">Motion</span>
          </MotionContainer>
        </Link>{" "}
        library, it provides developers with a declarative approach to animate
        child elements based on their visibility in the viewport. With
        pre-defined animation modes and transition configurations, it eliminates
        the repetitive work of manually creating animations for every element,
        streamlining the process while delivering{" "}
        <MotionContainer
          configView={{ once: true, amount: 0.5 }}
          elementType={"span"}
          duration={1}
          {...animationConfig}
          delay={2.5}
          mode={["fadeIn", "filterBlurIn"]}
          transition="easeIn"
          children="polished results."
        />
      </p>
      <MotionContainer
        mode={["fadeIn", "filterBlurIn"]}
        configView={{ once: true, amount: 0.5 }}
        elementType={"div"}
        {...animationConfig}
        delay={2.75}
        duration={1}
        transition="smooth"
      >
        <h2 className="pt-12 lg:text-3xl font-bold pb-6">
          Why Motion Provider?
        </h2>
      </MotionContainer>
      {stopAnimation ? (
        <MotionContainer
          mode={["fadeIn", "filterBlurIn"]}
          configView={{ once: true, amount: 0.5 }}
          elementType={"div"}
          duration={1}
          transition="smooth"
        >
          {text}
        </MotionContainer>
      ) : (
        <MotionText
          {...animationConfig}
          once={false}
          keywords={keywords as MotionTextKeywordsProps[]}
          highlightLastIndexFrom={3}
          transition="smooth"
          delay={!isMobile ? 4 : 0}
          children={text}
          className="pt-6"
          elementType={"span"}
          duration={1}
          speed={0.15}
          configView={{ once: true, amount: 0.5 }}
          mode={["fadeIn", "filterBlurIn"]}
        />
      )}
      <Alert className="mt-12">
        <MotionContainer
          configView={{ once: true, amount: 0.5 }}
          elementType={"div"}
          mode={["fadeIn", "bounceX"]}
          children={<Lightbulb key={1} />}
        />
        <AlertTitle className=" mb-4 mt-1 " key={2}>
          <MotionContainer
            children="Insights: Difference between Motion Provider and Motion"
            configView={{ once: true, amount: 0.5 }}
            elementType={"span"}
            mode={["fadeIn", "filterBlurIn"]}
            delay={18}
            transition="smooth"
            isControlled={{ trigger: !animationConfig.isAnimationStopped }}
            duration={1}
            className="font-bold text-lg"
            {...animationConfig}
          />
        </AlertTitle>
        <AlertDescription className="" key={3}>
          <MotionQueue
            elementType={"div"}
            duration={1}
            children={[
              <p className="text-sm" key={1}>
                Imagine you’re driving your Nissan 350z-my fav-, and you need to
                reverse. However, the car is currently stopped. Let’s explore
                how Motion Provider and traditional Framer Motion approach this
                scenario:
              </p>,
              <p className="pt-2" key={2}>
                <span className={cn(providerStyle, geist.className)}>
                  MotionProvider:
                </span>{" "}
                Like a car with an automatic transmission: you just set "drive"
                or "reverse," and the system manages the gears for you.
                <br />
                <span className={cn(framerStyle)} key={3}>
                  framer-motion{"(motion)"}
                </span>
                : Like a manual transmission: you control every gear shift,
                which gives you more control but requires more effort and
                expertise.
              </p>,
            ]}
            animations={[
              {
                configView: { once: false, amount: 0.5 },
                mode: ["fadeLeft", "filterBlurIn"],
                transition: "smooth",
                delay: 12,
                isAnimationStopped: !animationConfig.isAnimationStopped,
              },
              {
                configView: { once: false, amount: 0.5 },
                mode: ["fadeRight", "filterBlurIn"],
                transition: "smooth",
                delay: 8,
                isAnimationStopped: !animationConfig.isAnimationStopped,
              },
            ]}
          />
        </AlertDescription>
      </Alert>
      <h2 className="pt-12 lg:text-3xl font-bold">
        Basic Motions using 2 different APIs
      </h2>
      <p className="tracking-tight  dark:text-neutral-300  text-base pt-4 lg:pt-6">
        Here you have 2 different code examples doing the same thing but in
        different ways. Left one provides motions for the defined element and
        creates a new motioned react element using{" "}
        <span className={cn(providerStyle, geist.className)}>
          Motion Provider's API using{" "}
        </span>
        <span className={cn(framerStyle)}>Motion</span> itself. Right one uses{" "}
        <span className={cn(framerStyle)}>Framer Motion's API.</span> Both of
        them are unique and can be used for different purposes.
      </p>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[200px] lg:max-h-[225px] w-full rounded-lg border md:min-w-[450px] mt-8"
      >
        <ResizablePanel defaultSize={50}>
          <CodeProvider
            code={documentationLib.motionSimple.code}
            desc={documentationLib.motionSimple.desc}
            rounded
            appTheme={appTheme}
            fontSize={isMobile ? "sm" : "md"}
            wrapperStyle="w-full h-full"
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <CodeProvider
            code={documentationLib.framerSimple.code}
            desc={documentationLib.framerSimple.desc}
            rounded
            appTheme={appTheme}
            fontSize={isMobile ? "sm" : "md"}
            wrapperStyle="w-full h-full"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Blog />
    </>
  );
}

const Blog = () => (
  <div className="w-full py-20 lg:py-24 ">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <div className="flex flex-wrap gap-2 w-full lg:max-w-sm ">
          <MotionQueue
            isDynamicallyQueued
            delayLogic="linear"
            duration={0.25}
            elementType="h4"
            animations={
              Array.from({ length: blogTitle.length }).fill({
                mode: ["fadeRight"],
                duration: 1,
                transition: "smooth",
              }) as AnimationQueueAnimationProps[]
            }
            children={blogTitle.map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            className="text-4xl lg:text-5xl tracking-tighter text-left font-bold"
          />
        </div>
      </div>
      <p className="text-muted-foreground -mt-6">
        Discover my special open-source SPA collection powered by Motion
        Provider. Each are unique, customizable, and ready for deployment. Go to
        the page, view the code then learn{" "}
        <span className={providerStyle}>Motion Provider essentials.</span>{" "}
        Everything free to use for the community who has potential to make the
        web better.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 -mt-2">
        <MotionQueue
          isDynamicallyQueued
          delayLogic="linear"
          duration={0.25}
          elementType="div"
          animations={
            Array.from({ length: 4 }).fill({
              mode: ["fadeRight"],
              duration: 1,
              transition: "smooth",
            } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
          }
          children={Array.from({ length: 4 }).map((_, i) => (
            <div className="hover:scale-105" key={i}>
              <Link href={blogList[i].url}>
                <MotionImage
                  animationDuration={0.25}
                  delayLogic="sinusoidal"
                  transition="cubicSmooth"
                  key={i}
                  imageUrl={blogList[i].src}
                  pieces={25}
                  wrapperClassName="rounded-md aspect-video mb-4"
                  animations={["filterInvertColors"]}
                  motionFn="hover"
                  isDynamicallyQueued
                />
                <h3 className="text-xl tracking-tight">{blogList[i].title}</h3>
                <ul className="text-muted-foreground tracking-tighter text-xs pt-2 ">
                  {blogList[i].desc.map((text, i) => (
                    <li key={i} className="truncate">
                      {text}
                    </li>
                  ))}
                </ul>
              </Link>
            </div>
          ))}
          className="flex flex-col gap-2 hover:opacity-75 cursor-pointer"
        />
      </div>
    </div>
  </div>
);

export const providerStyle = `bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text`;
