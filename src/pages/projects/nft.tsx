import Head from "next/head";
import { Bangers, Inter } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TbWorld } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Code, Expand } from "lucide-react";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import MotionImage from "@/components/MotionProvider/motion-image";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeProvider from "@/components/Documentation/code-provider";
import projectsLib from "@/lib/projects.lib";
import MotionContainer from "@/components/MotionProvider/motion-container";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "400" });

const title = "Experience Modern NFT Art".split(/\s+/);
const desc =
  `Explore a curated collection of unique digital assets and stunning NFT art. Embrace the future of digital creativity with style and elegance.`.split(
    /\s+/
  );
export default function Nft() {
  const components = [
    <div className="lg:w-48 lg:h-48 w-24 h-24 rotate-180 lg:ml-[42rem] ml-48 z-[999] bg-[url(/assets/projects/nft-tree1.png)] bg-center bg-cover" />,
    <div className="lg:w-48 lg:h-36 w-24 h-16 invert rotate-180 z-[999] bg-[url(/assets/projects/nft-tree1.png)] bg-center bg-cover" />,
    <div className="lg:w-48 lg:h-48 w-24 h-24 rotate-180 lg:mr-[42rem] mr-48 z-[999] bg-[url(/assets/projects/nft-tree1.png)] bg-center bg-cover" />,
    <div className="lg:w-48 lg:h-48 w-24 h-24 rotate-180 absolute left-0 top-0  z-[999] bg-[url(/assets/projects/nft-tree3.png)] bg-center bg-cover" />,
  ] as React.ReactNode[];

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

  const assetAnimations = Array.from({ length: components.length }).fill({
    mode: ["fadeIn", "filterBlurIn", "scaleZoomIn"],
    duration: 2,
    transition: "quickBounce",
    ...config,
  } as AnimationQueueAnimationProps);

  return (
    <>
      <Head>
        <title>Modern NFT Landing App</title>
        <meta
          name="description"
          content="Discover modern NFT art with our light, responsive landing page built with Next.js, React, and Tailwind CSS."
        />
      </Head>
      <MotionQueue
        duration={2}
        elementType={"div"}
        className="w-full h-48 top-0 fixed z-[999] items-center justify-between flex flex-col"
        animations={assetAnimations as AnimationQueueAnimationProps[]}
        customLogic={(index) => index + 1}
      >
        {components.map((val, idx) => (
          <Fragment key={idx}>{val}</Fragment>
        ))}
      </MotionQueue>
      <div
        className={`${bangers.className} min-h-screen bg-gray-50 w-full overflow-y-scroll`}
      >
        <nav className="container mx-auto flex flex-row items-center justify-end px-5 py-8 text-xl text-black fixed top-0 right-1/2 translate-x-1/2 z-[999]">
          <div className="flex flex-row items-center justify-center lg:gap-3 gap-2">
            <Link
              href="https://www.instagram.com/_masculin_/"
              target="_blank"
              className="flex hover:text-stone-600"
              rel="noopener noreferrer"
            >
              <FaInstagram className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/burak-bilen-483772227"
              target="_blank"
              className="flex hover:text-stone-600"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="flex hover:text-stone-600"
              rel="noopener noreferrer"
            >
              <TbWorld className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/Masculinn"
              target="_blank"
              className="flex hover:text-stone-600"
              rel="noopener noreferrer"
            >
              <FaGithub className="lg:w-6 lg:h-6 w-5 h-5" />
            </Link>
            <Link
              href="buymeacoffee.com/bilenburakf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline lg:scale-100 scale-90 -mt-[14px] cursor-pointer"
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
                  elementClassname="h-full w-full shadow-none border-none "
                  wrapperClassName="h-[25px] w-[27px] shadow-none border-none"
                  animations={["rotating360", "translate3dIn"]}
                />
                <span className="ml-2 cursor-pointer">Buy Me A Coffee</span>
              </Badge>
            </Link>
          </div>
        </nav>

        <main className="pt-24 flex flex-col items-center justify-center text-center px-6 py-20 relative min-h-screen">
          <div className="lg:w-1/3 lg:h-96 w-3/4 h-72 mb-8 relative">
            <MotionImage
              isDynamicallyQueued
              totalDelay={0}
              animationDuration={1.5}
              delayLogic="perlin"
              transition="cubicElastic"
              imageUrl="/assets/projects/nft-bg.webp"
              controlConfig={{
                isControlled: true,
                ...config,
              }}
              pieces={121}
              fallback={
                <Skeleton className="absolute w-full h-full z-[999] inset-0 object-cover border-none" />
              }
              wrapperClassName="absolute w-full h-full z-[999]  border-none transform-gpu"
              motionFn="hover"
              animations={["rotateRoll", "flash"]}
            />
          </div>
          <h1 className="flex flex-wrap lg:gap-2 gap-1">
            <MotionQueue
              isDynamicallyQueued
              className="lg:text-6xl text-4xl font-bold tracking-wider text-black"
              elementType="span"
              animations={
                Array.from({ length: title.length }).fill({
                  mode: ["filterBlurIn", "fadeDown"],
                  duration: 1,
                  transition: "delayedElastic",
                  ...config,
                } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
              }
              children={title}
              duration={0.5}
              delayLogic="linear"
            />
          </h1>
          <p
            className={cn(
              "pt-4 text-lg sm:text-xl text-stone-700 max-w-2xl mx-auto tracking-tighter flex flex-wrap gap-1 items-center text-center justify-center ",
              inter.className
            )}
          >
            <MotionQueue
              animations={
                Array.from({ length: desc.length }).fill({
                  mode: ["filterBlurIn", "fadeDown"],
                  duration: 1,
                  transition: "delayedElastic",
                  ...config,
                } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
              }
              children={desc}
              elementType={"span"}
              delayLogic="chaotic"
              isDynamicallyQueued
            />
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size={"lg"}
              variant={"outline"}
              onClick={handleReverse}
              disabled={reverseAnimation}
            >
              <span className="mr-2">
                {reverseAnimation ? "Hide" : "View"} Code
              </span>
              <Code />
            </Button>
            <Button size={"lg"}>Learn More</Button>
          </div>
        </main>
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
                code={projectsLib.nft.code}
                desc={projectsLib.nft.desc}
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
