import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Code, Expand } from "lucide-react";
import { Inter } from "next/font/google";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import MotionContainer from "@/components/MotionProvider/motion-container";
import MotionImage from "@/components/MotionProvider/motion-image";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Head from "next/head";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeProvider from "@/components/Documentation/code-provider";
import projectsLib from "@/lib/projects.lib";

const font = Inter({ subsets: ["latin"], weight: "400" });

const header = "Making bitcoin more than an investment.".split(/\s+/);
const description =
  "Bitcoin is a digital currency that can be used to buy goods and services online. It is a decentralized and peer-to-peer payment system that is powered by the internet.  Bitcoin is also known as digital gold, and is used to store value in the world of finance.";

export default function Crypto() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = (checked: boolean) =>
    setTheme(checked ? "dark" : "light");

  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  const config = useAnimation({
    stopAnimation: false,
    reverseAnimation,
    recallDuration: 1,
  });

  const handleReverse = () => {
    if (reverseAnimation) {
      setReverseAnimation(false);
      setShowCode(false);
    } else {
      setReverseAnimation(true);
      setTimeout(() => {
        setShowCode(true);
      }, 4000);
    }
  };
  return (
    <>
      <Head>
        <title>Motion Provider - Crypto Landing App</title>
      </Head>
      <div
        className={cn(
          `relative transition-all duration-200 will-change-contents h-screen overflow-hidden w-full bg-black ${font.className}`,
          theme !== "dark" && " invert"
        )}
      >
        <nav className="container mx-auto flex flex-row items-center justify-between px-5 py-8 text-xl text-white">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-[#FF00E5] lg:mb-4 md:mb-0" />
          <div className="flex flex-row items-center justify-center lg:gap-3 gap-2">
            <Link
              href="https://www.instagram.com/_masculin_/"
              target="_blank"
              className="flex hover:text-white"
              rel="noopener noreferrer"
            >
              <FaInstagram className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/burak-bilen-483772227"
              target="_blank"
              className="flex hover:text-white"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="buymeacoffee.com/bilenburakf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex hover:text-white"
            >
              <TbWorld className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/Masculinn"
              target="_blank"
              className="flex hover:text-white"
              rel="noopener noreferrer"
            >
              <FaGithub className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="font-bold hover:underline lg:scale-100 scale-90 -mt-[14px]"
              rel="noopener noreferrer"
            >
              <Badge variant={"secondary"}>
                <MotionImage
                  isDynamicallyQueued
                  totalDelay={0.5}
                  animationDuration={1}
                  delayLogic="sinusoidal"
                  transition="cubicElastic"
                  imageUrl={
                    "https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                  }
                  pieces={64}
                  fallback={
                    <Skeleton className="lg:h-[25px] h-auto w-auto lg:w-[27px] rounded-full" />
                  }
                  elementClassname="h-full w-full shadow-none border-none"
                  wrapperClassName="h-[25px] w-[27px] shadow-none border-none"
                  animations={["rotating360", "translate3dIn"]}
                  controlConfig={{
                    isControlled: true,
                    reverse: false,
                    isAnimationStopped: false,
                  }}
                />
                <span className="ml-2">Buy Me A Coffee</span>
              </Badge>
            </Link>
          </div>
        </nav>
        <div className="relative flex items-center justify-center text-white z-50 px-4  w-full h-screen bg-transparent ">
          <div className="max-w-3xl mx-auto lg:-mt-32 -mt-48 ">
            <div className="flex flex-wrap lg:gap-3 gap-1 lg:justify-center justify-start">
              <MotionQueue
                isDynamicallyQueued
                elementType="h2"
                animations={
                  Array.from({ length: header.length + 1 }).fill({
                    mode: ["filterBlurIn", "fadeDown"],
                    duration: 1,
                    isAnimationStopped: config?.isAnimationStopped,
                    isControlled: { trigger: true },
                    reverse: config?.reverse,
                  } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
                }
                children={[
                  ...header,
                  <div
                    className="flex items-center justify-center h-auto py-1 lg:py-4 lg:px-4 px-2"
                    key={"themeSwitcher"}
                  >
                    <ThemeSwitcher
                      onChange={toggleTheme}
                      theme={theme}
                      classname="lg:scale-150 scale-125  self-center"
                    />
                  </div>,
                ]}
                delayLogic="fibonacci"
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-tighter lg:px-0 px-1 capitalize"
                duration={1}
              />
            </div>
            <MotionContainer
              {...config}
              elementType="p"
              mode={["filterBlurIn", "fadeDown"]}
              duration={1}
              delay={4}
              transition="smooth"
              children={description}
              className="my-4 lg:text-center font-medium px-2 lg:text-base text-sm text-start"
            />
            <div className="pt-4 flex justify-center items-center flex-row gap-2">
              <Button
                className="m-1 rounded-xl px-8 sm:px-16 py-3 dark"
                onClick={handleReverse}
                disabled={reverseAnimation}
              >
                <span className="mr-2">
                  {reverseAnimation ? "Hide" : "View"} Code
                </span>
                <Code />
              </Button>
              <Button className="m-1 rounded-xl px-8 sm:px-16 py-3 text-white border-1 border-stone-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <MotionImage
          isDynamicallyQueued
          totalDelay={4}
          animationDuration={6}
          controlConfig={{
            ...config,
            isControlled: true,
          }}
          delayLogic="pendulum"
          transition="delayedElastic"
          fallback={<div className="bg-black object-cover absolute inset-0" />}
          imageUrl={"/assets/projects/crypto-circle.png"}
          pieces={400}
          wrapperClassName="object-cover absolute inset-1 lg:w-1/2 lg:mt-0 mt-24 w-full lg:h-full h-1/2 "
          animations={["staggeredIn", "filterHueRotate"]}
        />
      </div>
      {showCode && (
        <MotionContainer
          elementType="div"
          mode={["filterBlurIn", "fadeDown"]}
          configView={{ once: false, amount: "some" }}
          isControlled={{
            trigger: showCode,
          }}
          children={
            <div className="backdrop-blur-md border border-stone-900 items-center justify-center lg:max-w-3xl lg:mx-auto h-2/3 w-full rounded-lg text-black">
              <div className="absolute top-0 right-14 z-[99]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50 dark:text-white text-black bg-white"
                        onClick={handleReverse}
                      >
                        <Expand className="w-4 h-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Back</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CodeProvider
                wrapperStyle="max-w-3xl mx-auto w-full"
                code={projectsLib.crypto.code}
                desc={projectsLib.crypto.desc}
                rounded
                showLineNumbers
                fontSize="sm"
                appTheme="dark"
              />
            </div>
          }
          transition="cubicElastic"
          duration={1}
          className="w-full h-screen fixed backdrop-blur-lg bg-black/50 items-center justify-center flex lg:flex-row flex-col inset-0 lg:gap-8 gap-4 text-white py-24 p-8 lg:p-0 z-[999]"
        />
      )}
    </>
  );
}
