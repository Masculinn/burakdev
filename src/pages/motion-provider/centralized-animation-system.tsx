import Head from "next/head";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AnimationKeys,
  AnimationQueueAnimationProps,
} from "@/components/MotionProvider/types";
import { Fragment, useState } from "react";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  CircuitBoard,
  Cpu,
  Expand,
  GitBranch,
  Hand,
  Lightbulb,
  Pause,
  RadioTower,
  RefreshCw,
  SkipBack,
  SkipForward,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { ReduxThemeProps, StepCardDataProps } from "@/interfaces";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import documentationLib from "@/lib/documentation.lib";
import CodeProvider from "@/components/Documentation/code-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MotionRenderer from "@/components/Documentation/centralized/prototypes/motion-renderer";
import { CodeBadge } from "@/components/Documentation/code-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StepCards } from "@/components/Documentation/step-cards";
import Conclusion from "@/components/Documentation/centralized/prototypes/conclusion";
import MotionImage from "@/components/MotionProvider/motion-image";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import MotionContainer from "@/components/MotionProvider/motion-container";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";

const stepCardsData = [
  {
    title: "State Management Core",
    desc: "CAS maintains a centralized store for animation states using a custom hook architecture. The system tracks:",
    list: [
      "Animation playback status (running/paused)",
      "Direction (forward/reverse)",
      "Sequence progress",
      "Component dependencies",
    ],
  },
  {
    title: "Control Propagation",
    desc: (
      <div className="text-sm text-muted-foreground mt-2">
        When control states change, CAS uses a <CodeBadge code="Proxy-based" />{" "}
        observer pattern to efficiently propagate changes to affected
        components. The system batches updates using
        <CodeBadge code="requestAnimationFrame" /> for optimal performance.
      </div>
    ),
  },
  {
    title: "Dependency Resolution",
    desc: (
      <div className="text-sm text-muted-foreground mt-2">
        CAS automatically resolves component relationships using a
        <CodeBadge code="Directed Acyclic Graph (DAG)" /> structure. This
        enables:
        <ul className="list-disc pl-6 mt-2">
          <li>Sequenced animations</li>
          <li>Parent-child relationships</li>
          <li>Cross-component synchronization</li>
        </ul>
      </div>
    ),
  },
] as StepCardDataProps[];

const animations = ["filterBlurIn", "fadeRight"];
const headerText = "Centralized Animation System";
const subText = "Control Your Animations like a pro.";
const cardDescTitle = "Support Me!";
const entranceText = `Motion Provider lets you create professional animations with minimal code - just 4 lines unlocks 65+ built-in effects! At its core is the Centralized Animation System (CAS) that automatically manages animation states, timing, and performance. Using useAnimation() hook, CAS handles the heavy lifting: smart dependency tracking (updates 300+ elements in <2ms), GPU-accelerated transforms, and conflict-free transitions. You get pro-level results without complex code.`;
const lametiations =
  "**okay burak we understood the basics, just tell me more about controlling it.";
const reversedGainedText =
  "Great! then you see the difference between the two. Check the diff code below and learn how to implement!";
const headerArr = headerText.split(/\s+/);
const subArr = subText.split(/\s+/);
const cardDescArr = cardDescTitle.split(/\s+/);
const lametiationsArr = lametiations.split(/\s+/);
const reversedGainedTextArr = reversedGainedText.split(/\s+/);

const cardContent = `Motion Provider lets you create professional animations with minimal code - just 4 lines unlocks 65+ built-in effects! At its core is the Centralized Animation System (CAS)  that automatically manages animation states, timing, and performance. When you use my GPU-accelerated transforms (60 FPS guaranteed), and conflict-free transitions. 
You get pro-level results without complex code - like this scroll-triggered fade effect that's 40% 
faster than traditional React animations.`;

const cardContentArr = cardContent.split(/\s+/);
const cardTextAnimations = ["filterBlurIn", "fadeRight"];

export default function CentralizedAnimationSystem() {
  const [stopAnimation, setStopAnimation] = useState<boolean>(false);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);
  const [cardVisible, setCardVisible] = useState<boolean>(false);

  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();

  const fontSize = isMobile ? "sm" : "md";

  const animationConfig = useAnimation({
    stopAnimation,
    reverseAnimation,
    recallDuration: 1,
  });

  const handleOpenCard = () => setCardVisible((prev) => !prev);

  const Coffee = () => {
    if (isMobile) {
      return (
        <>
          <Button variant="ghost" onClick={handleOpenCard}>
            <Lightbulb />
          </Button>
        </>
      );
    }

    return (
      <TooltipProvider skipDelayDuration={0} delayDuration={0} key={2}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Lightbulb />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-transparent">
            <Card className="">
              <CardHeader className="relative w-full flex text-center gap-1 text-lg items-center justify-center ">
                <Card className="relative  text-3xl w-full flex flex-col self-start  items-start text-center gap-1 leading-[0.8] p-6 px-8 border-none ">
                  <MotionImage
                    controlConfig={{
                      ...animationConfig,
                      isControlled: true,
                    }}
                    animations={["filterInvertColors", "funTwinkleToes"]}
                    imageUrl="/assets/components/banner-bg.webp"
                    pieces={49}
                    fallback={<Skeleton className="w-full h-full absolute" />}
                    animationDuration={4}
                    transition="cubicElastic"
                    delayLogic="sinusoidal"
                    isDynamicallyQueued
                    totalDelay={1}
                    wrapperClassName="w-full h-full absolute rounded-xl inset-0 "
                  />
                  <MotionQueue
                    key={1}
                    elementType="span"
                    duration={1}
                    delayLogic="linear"
                    isDynamicallyQueued
                    className=" font-bold font-sans relative leading-[0.8]  text-white"
                    animations={
                      Array.from({ length: cardDescArr.length }).fill({
                        mode: [...animations, "filterInvertColors"],
                        duration: 1,
                      }) as AnimationQueueAnimationProps[]
                    }
                    children={cardDescArr.map((val, idx) => (
                      <Fragment key={idx}>{val}</Fragment>
                    ))}
                  />
                </Card>
              </CardHeader>
              <CardContent>
                <ScrollArea className="relative flex z-50 h-48 w-60">
                  <div className="flex-wrap gap-1 text-stone-800  flex w-full h-full leading-[1.2] ">
                    <MotionQueue
                      elementType="span"
                      className="tracking-tighter text-md"
                      animations={
                        Array.from({ length: cardContentArr.length }).fill({
                          mode: cardTextAnimations,
                          duration: 0.5,
                        }) as AnimationQueueAnimationProps[]
                      }
                      children={cardContentArr.map((val) => (
                        <span key={val}>{val}</span>
                      ))}
                      isDynamicallyQueued
                      duration={0.05}
                      delayLogic="linear"
                    />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="items-center justify-center flex">
                <BuyMeCoffee />
              </CardFooter>
            </Card>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      <Head>
        <title>Motion Provider - Centralized Animation System (CAS)</title>
        <meta
          name="description"
          content="Centralized Animation System (CAS) lets you create professional animations with minimal code - just 4 lines unlocks 65+ built-in effects!"
        />
        <meta property="og:title" content="Motion Provider - CAS" />
        <meta
          property="og:description"
          content="Centralized Animation System (CAS) lets you create professional animations with minimal code - just 4 lines unlocks 65+ built-in effects!"
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/assets/components/banner-bg.webp" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/centralized-animation-system"
        />
        <meta property="og:site_name" content="burakdev" />

        <meta name="twitter:title" content="Motion Provider - CAS" />
        <meta
          name="twitter:description"
          content="Centralized Animation System (CAS) lets you create professional animations with minimal code - just 4 lines unlocks 65+ built-in effects!"
        />
        <meta
          name="twitter:image"
          content="/assets/components/banner-bg.webp"
        />
      </Head>
      <div className="w-full lg:h-1/3 h-1/4 rounded-xl items-center justify-center text-center lg:px-0 px-12 flex flex-col gap-2 relative">
        <MotionImage
          controlConfig={{
            ...animationConfig,
            isControlled: true,
          }}
          animations={
            theme === "dark"
              ? ["rotateFlipY"]
              : ["filterInvertColors", "rotateFlipY"]
          }
          imageUrl="/assets/components/banner-bg.webp"
          pieces={169}
          fallback={<Skeleton className="w-full h-full absolute" />}
          animationDuration={5}
          transition="cubicElastic"
          delayLogic="sinusoidal"
          isDynamicallyQueued
          totalDelay={1}
          wrapperClassName="w-full h-full absolute rounded-xl inset-0"
        />
        <div className="flex items-center justify-center flex-col lg:gap-2">
          <div className="flex flex-row gap-1">
            <MotionQueue
              key={1}
              elementType="span"
              duration={0.2}
              delayLogic="linear"
              isDynamicallyQueued
              className={cn(
                `text-xl lg:text-4xl font-bold tracking-tight text-center`
              )}
              animations={
                Array.from({ length: headerArr.length }).fill({
                  mode: animations,
                  duration: 1,
                }) as AnimationQueueAnimationProps[]
              }
              children={headerArr.map((val, idx) => (
                <Fragment key={idx}>{val}</Fragment>
              ))}
            />
          </div>
          <div className="flex flex-row gap-1">
            <MotionQueue
              key={2}
              elementType="span"
              duration={0.3}
              delayLogic="chaotic"
              isDynamicallyQueued
              className="dark:text-neutral-300 lg:text-sm text-xs"
              animations={
                Array.from({ length: subArr.length }).fill({
                  mode: animations,
                  duration: 1,
                }) as AnimationQueueAnimationProps[]
              }
              children={subArr.map((val) => (
                <Fragment key={val}>{val}</Fragment>
              ))}
            />
          </div>
        </div>
      </div>
      <MotionContainer
        elementType="h2"
        mode={["filterBlurIn", "fadeRight"]}
        transition="smooth"
        duration={0.5}
        className="lg:text-3xl text-2xl font-bold lg:pt-12 pt-8"
        children={"Introducing CAS - The Centralized Animation System"}
      />
      <div className="flex flex-wrap gap-1 w-full h-auto relative pt-4 lg:pt-6">
        <MotionQueue
          key={2}
          elementType="span"
          duration={0.35}
          delayLogic="chaotic"
          isDynamicallyQueued
          animations={
            Array.from({ length: entranceText.split(/\s+/).length }).fill({
              mode: animations as AnimationKeys[],
              duration: 1,
              isControlled: stopAnimation,
              reverse: reverseAnimation,
              isAnimationStopped: stopAnimation,
              transition: "cubicElastic",
            }) as AnimationQueueAnimationProps[]
          }
          children={entranceText.split(/\s+/).map((val) => (
            <span
              key={val}
              className="dark:text-neutral-200 tracking-tighter lg:text-sm text-xs"
            >
              {val}
            </span>
          ))}
        />
      </div>
      <section className="mb-12 mt-8">
        <p className="mb-4 tracking-tight">
          The neural network of MotionProvider - CAS orchestrates complex
          animation workflows across components with surgical precision.
          Experience animation control at scale:
        </p>
        <Alert className="mb-8">
          <AlertTitle className="flex items-center gap-2">
            <CircuitBoard className="h-6 w-6 text-purple-500" />
            <span className="lg:text-lg text-base font-bold">
              Architecture Highlights
            </span>
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <ul className="list-disc pl-6">
              <li>Proxy-based state observation</li>
              <li>Atomic animation transactions</li>
              <li>Directed dependency graphs</li>
              <li>GPU-priority task scheduling</li>
              <li>Cross-component synchronization</li>
            </ul>
          </AlertDescription>
        </Alert>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">Let's Dive!</h3>
        <div className="mb-4 text-muted-foreground lg:text-base text-sm">
          I will explain everything for you to control all your animations using
          centralized control like a senior frontend engineer. First, take a
          look at the code shown below:
        </div>
        <CodeProvider
          code={documentationLib.casAnotomyCode1.code}
          appTheme={theme}
          bordered
          desc={documentationLib.casAnotomyCode1.desc}
          rounded
          fontSize={fontSize}
          lang="typescript"
        />
        <div className="my-4 text-muted-foreground lg:text-base text-sm">
          <p className="my-4 lg:my-6">
            You may remember <code>{"<MotionImage />"}</code> component. If you
            did not check it out yet,{" "}
            <Link
              href={"/motion-provider/image-motion"}
              className="underline underline-offset-2 dark:hover:text-white hover:text-black"
            >
              please click here to go <code>{"<MotionImage />"}</code>{" "}
              documentation page
            </Link>{" "}
            . Now, let's see how is the result:
          </p>
          <MotionRenderer
            code="falan filan"
            desc="bash"
            theme={theme}
            isMobile={isMobile}
          >
            <MotionImage
              pieces={144}
              isDynamicallyQueued
              controlConfig={{
                ...animationConfig,
                isControlled: true,
              }}
              animationDuration={2.1}
              delayLogic="sinusoidal"
              transition="fadeSlide"
              imageUrl="/assets/components/cas/cas-anatomy-bg.webp"
              wrapperClassName="w-full lg:h-96 h-60"
              animations={["rotateRoll", "rotateFlipY"]}
            />
          </MotionRenderer>
          <div className="my-4 lg:my-6 ">
            I'm hearing your,
            <br />
            <div className="flex flex-wrap tracking-tighter items-center my-2">
              <MotionQueue
                key={reverseAnimation ? 2 : 1}
                elementType="span"
                duration={0.2}
                className="lg:text-3xl font-bold text-2xl px-1 dark:text-neutral-200 text-black"
                delayLogic="linear"
                isDynamicallyQueued
                animations={
                  Array.from({
                    length: reverseAnimation
                      ? reversedGainedTextArr.length
                      : lametiationsArr.length,
                  }).fill({
                    mode: animations,
                    duration: 1,
                  }) as AnimationQueueAnimationProps[]
                }
                children={
                  reverseAnimation
                    ? reversedGainedTextArr.map((val) => (
                        <Fragment key={val}>{val}</Fragment>
                      ))
                    : lametiationsArr.map((val) => (
                        <Fragment key={val}>{val}</Fragment>
                      ))
                }
              />
            </div>
            lametiations. Before explaining how it works, I want you to press
            the buttons{" "}
            <span className="inline-flex">
              <SkipForward className="w-4 h-4" /> <Pause className="w-4 h-4" />
            </span>{" "}
            below then check the image once again after you pressed. If you get
            it right, then take a look at this code piece:
          </div>
          <CodeProvider
            code={documentationLib.casAnotomyCode2.code}
            appTheme={theme}
            bordered
            desc={documentationLib.casAnotomyCode2.desc}
            rounded
            fontSize={fontSize}
            lang="typescript"
          />
          <p className="lg:my-6 my-4">
            This logic is simply all your need in your entire project to control
            your animations. At runtime, all the changes you made logic and
            passing it to any Motion Provider component, you will gain a
            centralized control for your all components.
          </p>
          <p className="dark:text-white text-black my-4 lg:my-6 ">
            Here the same logic that I created random animations by rolling a
            dice in{" "}
            <Link
              href="/motion-provider/motion-image-engine"
              className="underline underline-offset-2 hover:text-muted-foreground"
            >
              Motion Image Engine
            </Link>{" "}
            mounted to the <code>{"<MotionImage />"}</code> component explains
            what you saw above in image:
          </p>
          <CodeProvider
            code={documentationLib.casAnotomyCode3.code}
            appTheme={theme}
            bordered
            desc={documentationLib.casAnotomyCode3.desc}
            rounded
            fontSize={fontSize}
            lang="typescript"
          />
        </div>
      </section>
      <section className="my-12">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          React Elemental Approach
        </h3>
        <div className="mb-4 text-muted-foreground lg:text-base text-sm">
          Let's take a look at another approach using{" "}
          <CodeBadge code="useAnimation()" />. This time we will work on{" "}
          <CodeBadge code="<MotionContainer />" />. Let's render one
          <CodeBadge code="<div />" /> element and work on it.
        </div>
        <MotionRenderer
          code="falan filan"
          desc="bash"
          theme={theme}
          isMobile={isMobile}
          wrapperClassName="flex items-center justify-center w-full h-48 bg-[url('/assets/components/cas/cas-anatomy-bg.webp')] bg-cover bg-center"
        >
          <MotionContainer
            elementType="div"
            {...animationConfig}
            configView={{ once: true, amount: "some" }}
            mode={["rotateFlipX", "fadeDown"]}
            transition="smooth"
            duration={1}
            className="w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500"
            delay={0}
          />
        </MotionRenderer>
        <div className="my-4 lg:my-6  ">
          I want you to press the buttons{" "}
          <span className="inline-flex">
            <SkipForward className="w-4 h-4" /> <Pause className="w-4 h-4" />
          </span>{" "}
          below, once again then check the container.
        </div>
        <p className=" my-4 lg:my-6 text-muted-foreground lg:text-base text-sm">
          If you get it right, then take a look at this code piece explaining
          what is happening on this container:
        </p>
        <CodeProvider
          code={documentationLib.casAnotomyCode4.code}
          appTheme={theme}
          bordered
          desc={documentationLib.casAnotomyCode4.desc}
          rounded
          fontSize={fontSize}
          lang="typescript"
        />
        <p className="dark:text-white text-black my-4 lg:my-6">
          The same logic goes for all Motion Provider components as well. So
          after learning the fundemental concepts on this page, you will be able
          to build a centralized animation system and control all your
          animations from a single place! I will be sharing lots of examples in
          my posts so If you want to get the full picture, you can visit my
          blogs daily.
        </p>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Control Flow Mechanics</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-500" />
              <span>Dependency Resolution</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Mechanism</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Linear", "Depth-first traversal", "O(n)"],
                    ["Tree", "Post-order traversal", "O(log n)"],
                    ["Graph", "Topological sort", "O(n + e)"],
                  ].map(([pattern, mechanism, perf], index) => (
                    <TableRow key={index}>
                      <TableCell>{pattern}</TableCell>
                      <TableCell>{mechanism}</TableCell>
                      <TableCell>
                        <code>{perf}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <RadioTower className="w-5 h-5 text-green-500" />
              <span>State Propagation</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Change Type</TableHead>
                    <TableHead>Propagation</TableHead>
                    <TableHead>Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Play/Pause", "Immediate", "1 frame"],
                    ["Direction", "Batched", "2-3 frames"],
                    ["Sequence", "Optimized", "<16ms"],
                  ].map(([change, propagation, latency], index) => (
                    <TableRow key={index}>
                      <TableCell>{change}</TableCell>
                      <TableCell>{propagation}</TableCell>
                      <TableCell>{latency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">CAS Hook Anatomy</h3>
        <StepCards data={stepCardsData} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Hook Features</span>
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-6">
                <li>Frame-perfect synchronization</li>
                <li>Atomic state transactions</li>
                <li>Automatic cleanup</li>
                <li>60FPS priority scheduling</li>
              </ul>
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-500" />
              <span>Performance Metrics</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableBody>
                  {[
                    ["State Updates", "<0.5ms"],
                    ["Dependency Resolution", "2ms (avg)"],
                    ["Full Propagation", "8-12ms"],
                  ].map(([metric, time], index) => (
                    <TableRow key={index}>
                      <TableCell>{metric}</TableCell>
                      <TableCell>
                        <code>{time}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Performance Optimization</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-purple-500" />
              <span>Rendering Optimization</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Technique</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Will-change", "+45% FPS"],
                    ["GPU Layers", "-30% Paint"],
                    ["Batched Updates", "+70% Throughput"],
                  ].map(([tech, impact], index) => (
                    <TableRow key={index}>
                      <TableCell>{tech}</TableCell>
                      <TableCell>
                        <code>{impact}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>
          <Alert className="items-center justify-center flex flex-col gap-4">
            <AlertTitle className="flex items-center gap-2">
              <Hand className="w-5 h-5 text-orange-500" />
              <span>Interaction Limits</span>
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-6 ">
                <li>Max 5 concurrent controlled sequences</li>
                <li>Keep dependency depth {"<5"} levels</li>
                <li>Limit to 3 state changes/sec during animations</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Best Practices</h3>
        <div className="space-y-4">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              <span>Optimal Patterns</span>
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-6">
                <li>Group related animations in component clusters</li>
                <li>Use atomic state updates for complex sequences</li>
                <li>Leverage the dependency graph for orchestration</li>
                <li>Batch state changes during critical animations</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-red-500" />
              <span>Anti-Patterns</span>
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-6">
                <li>Frequent state changes during animations</li>
                <li>Deep nested dependency chains</li>
                <li>Unbatched imperative controls</li>
                <li>Direct DOM manipulation bypassing CAS</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </section>
      <Conclusion />
      {cardVisible && (
        <div
          className="w-full h-screen items-center justify-center flex fixed top-0 left-0 backdrop-blur-sm"
          onClick={handleOpenCard}
        >
          <Card className="items-center justify-center text-center absolute top-[12%]  w-3/4 h-auto bg-white backdrop-blur-lg">
            <Button
              variant="ghost"
              className="top-8 right-8 absolute z-50 text-black bg-white rounded-full p-2.5"
            >
              <Expand />
            </Button>
            <CardHeader className="relative w-full flex text-center gap-1 text-lg items-center justify-center ">
              <Card className="relative text-3xl w-full flex flex-col self-center  items-start text-center gap-1 leading-[0.8] p-6 px-8 border-none bg-transparent">
                <MotionImage
                  animations={["filterInvertColors", "funTwinkleToes"]}
                  imageUrl="/assets/components/banner-bg.webp"
                  pieces={49}
                  fallback={<Skeleton className="w-full h-full absolute" />}
                  animationDuration={4}
                  transition="cubicElastic"
                  delayLogic="sinusoidal"
                  isDynamicallyQueued
                  wrapperClassName="w-full h-full absolute rounded-xl inset-0"
                />

                <MotionQueue
                  key={1}
                  elementType="span"
                  duration={1}
                  delayLogic="linear"
                  isDynamicallyQueued
                  className=" font-bold font-sans relative leading-[0.8] text-white"
                  animations={
                    Array.from({ length: cardDescArr.length }).fill({
                      mode: [...animations, "filterInvertColors"],
                      duration: 1,
                    }) as AnimationQueueAnimationProps[]
                  }
                >
                  {cardDescArr.map((val, idx) => (
                    <Fragment key={idx}>{val}</Fragment>
                  ))}
                </MotionQueue>
              </Card>
            </CardHeader>
            <CardContent className="w-full h-auto">
              <ScrollArea className="relative flex z-50 h-48 w-60">
                <div className="flex-wrap gap-1 text-stone-800  flex w-full h-full leading-[1.2] ">
                  <MotionQueue
                    elementType="span"
                    className="tracking-tighter lg:text-md text-xs"
                    animations={
                      Array.from({ length: cardContentArr.length }).fill({
                        mode: cardTextAnimations,
                        duration: 0.5,
                      }) as AnimationQueueAnimationProps[]
                    }
                    children={cardContentArr.map((val) => (
                      <span key={val}>{val}</span>
                    ))}
                    isDynamicallyQueued
                    duration={0.05}
                    delayLogic="linear"
                  />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="items-center justify-center flex">
              <BuyMeCoffee />
            </CardFooter>
          </Card>
        </div>
      )}
      <MotionContainer
        elementType={"div"}
        configView={{ once: false, amount: 0.5 }}
        mode={["filterBlurIn", "fadeIn"]}
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
              mode: ["rotateClockwise", "fadeIn"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: ["rotateClockwise", "fadeIn"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: ["rotateClockwise", "fadeIn"],
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
            <Coffee key={3} />,
          ]}
        />
      </MotionContainer>
    </>
  );
}
