import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import { Check, Expand, User } from "lucide-react";
import MotionContainer from "@/components/MotionProvider/motion-container";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, MoveRight } from "lucide-react";
import { FC, Fragment } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import MotionImage from "@/components/MotionProvider/motion-image";
import { useInView } from "motion/react";
import MotionImageQueue from "@/components/MotionProvider/motion-image-queue";
import { useAnimation } from "@/components/MotionProvider/hooks/use-animation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeProvider from "@/components/Documentation/code-provider";
import projectsLib from "@/lib/projects.lib";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const title = "Lost in the echoes of yesterday".split(/\s+/);
const feautureTitle = "Fragments of Yesterday".split(/\s+/);
const feauture2Title = "Echoes of a Fading Light".split(/\s+/);
const blogTitle = "Recent Reflections".split(/\s+/);

const getAnimation = ({
  length,
}: {
  length: number;
}): AnimationQueueAnimationProps[] => {
  return Array.from({ length: length }).fill({
    mode: ["fadeRight", "filterBlurIn"],
    duration: 1,
    transition: "smooth",
  }) as AnimationQueueAnimationProps[];
};

export default function SaaS() {
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  const isMobile = useIsMobile();
  const config = useAnimation({
    stopAnimation: false,
    reverseAnimation,
    recallDuration: 1,
  });
  const pieces = isMobile ? 81 : 144;
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
        <title>Motion Provider - Melancholy Moments</title>
        <meta
          name="description"
          content="A heartfelt journey through memories and quiet sorrows. Experience the beauty of melancholy and the bittersweet nature of time."
        />
      </Head>
      <nav className="container flex flex-row  items-center justify-between lg:max-w-7xl max-w-xs mx-auto py-8 text-xl text-stone-800 fixed top-0 right-1/2 translate-x-1/2 z-[999]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-[#FF00E5] lg:mb-4 md:mb-0" />

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
            href="https://buymeacoffee.com/bilenburakf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline lg:scale-100 scale-90 -mt-[14px] cursor-pointer"
          >
            <Badge variant={"default"}>
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
                controlConfig={{
                  isControlled: true,
                  ...config,
                }}
              />
              <span className="ml-2 cursor-pointer">Send a Memory</span>
            </Badge>
          </Link>
        </div>
      </nav>
      <div className="w-full h-screen absolute text-white items-center justify-center flex">
        <div className="container mx-auto ">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div className="flex gap-4 flex-col">
              <div className="flex flex-wrap gap-2 max-w-2xl text-center tracking-tighter items-center justify-center">
                <MotionQueue
                  isDynamicallyQueued
                  delayLogic="linear"
                  duration={0.25}
                  elementType="h1"
                  animations={
                    Array.from({ length: title.length }).fill({
                      mode: ["fadeUp", "filterBlurIn"],
                      duration: 1,
                      transition: "smooth",
                      ...config,
                    }) as AnimationQueueAnimationProps[]
                  }
                  children={title.map((text, i) => (
                    <Fragment key={i}>{text}</Fragment>
                  ))}
                  className="text-5xl md:text-7xl "
                />
              </div>
              <MotionContainer
                elementType="p"
                mode={["fadeUp"]}
                className="text-sm leading-relaxed tracking-tight text-muted max-w-2xl text-center"
                duration={0.8}
                delay={2}
                {...config}
                isControlled={{ trigger: true }}
                children={`In the quiet hours of dusk, memories whisper of a time long past. Every moment is a tender fragment, lost between the shadows of what was and what may never be again.`}
              />
            </div>
            <div className="flex lg:flex-row flex-col gap-3">
              <Button
                size="lg"
                className="gap-4"
                variant="ghost"
                disabled={reverseAnimation}
                onClick={handleReverse}
              >
                Reveal the Past <Code className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4 dark" variant={"outline"}>
                Embrace the Memories <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MotionImage
        isDynamicallyQueued
        animationDuration={0.8}
        delayLogic="chaotic"
        transition="cubicFastEnd"
        imageUrl={
          isMobile
            ? "/assets/projects/saas-background-mobile.webp"
            : "/assets/projects/saas-background.webp"
        }
        pieces={pieces}
        wrapperClassName="w-full h-screen inset-0 bg-black -z-10 "
        animations={
          !isMobile
            ? ["filterBlurIn", "fadeDown", "scaleZoomIn"]
            : ["filterBlurIn"]
        }
        controlConfig={{
          isControlled: true,
          ...config,
        }}
      />
      {!reverseAnimation && (
        <div className="container flex flex-col items-center justify-center lg:max-w-7xl max-w-xs mx-auto  h-auto">
          <Feature pieces={pieces} />
          <Feature2 pieces={pieces} />
          <Blog />
        </div>
      )}
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
                code={projectsLib.saas.code}
                desc={projectsLib.saas.desc}
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

interface FeautureListItem {
  title: string;
  desc: string;
}

const feautureList = [
  {
    title: "Whispers of the past",
    desc: "The echoes of bygone days remind us of tender, forgotten joys.",
  },
  {
    title: "Fleeting moments",
    desc: "Each second drifts away like a tear in the gentle rain.",
  },
  {
    title: "Silent reflections",
    desc: "In the stillness, our thoughts wander through memories of faded dreams.",
  },
] as FeautureListItem[];

const Feature = ({ pieces }: { pieces: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="w-full py-20 lg:py-40">
      <div
        className="grid rounded-lg container py-8 grid-cols-1 gap-8 items-center lg:grid-cols-2"
        ref={ref}
      >
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Reverie</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex flex-wrap gap-2 w-full">
                <MotionQueue
                  isDynamicallyQueued
                  delayLogic="linear"
                  duration={0.25}
                  elementType="h1"
                  animations={
                    getAnimation({
                      length: feautureTitle.length,
                    }) as AnimationQueueAnimationProps[]
                  }
                  children={feautureTitle.map((text, i) => (
                    <Fragment key={i}>{text}</Fragment>
                  ))}
                  className="text-3xl lg:text-5xl tracking-tighter text-left font-regular text-black"
                />
              </div>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                In the silent corridors of our hearts, each lost moment sings a
                ballad of love and sorrow.
              </p>
            </div>
          </div>
          <MotionQueue
            animations={
              Array.from({ length: feautureList.length }).fill({
                mode: ["fadeUp", "filterBlurIn"],
                duration: 0.75,
                transition: "smooth",
              } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
            }
            children={feautureList.map((item, i) => (
              <div className="flex flex-row gap-6 items-start" key={i}>
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
            elementType={"div"}
            className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6"
            delayLogic="linear"
            isDynamicallyQueued
            duration={1}
          />
        </div>
        <MotionImage
          isDynamicallyQueued
          totalDelay={1.7}
          animationDuration={0.8}
          delayLogic="chaotic"
          transition="delayedSmooth"
          configView={{ once: false, amount: "some" }}
          imageUrl={"/assets/projects/saas-feauture-bg.webp"}
          pieces={pieces}
          controlConfig={{
            isAnimationStopped: false,
            reverse: false,
            isControlled: inView,
          }}
          wrapperClassName="aspect-square"
          animations={["rotateFlipX", "filterBlurIn"]}
        />
      </div>
    </div>
  );
};

interface FeatureListItem2 {
  title: string;
  desc: string;
  src: string;
}

const assets = [
  "/assets/projects/saas-random-1.webp",
  "/assets/projects/saas-random-2.webp",
  "/assets/projects/saas-random-3.webp",
  "/assets/projects/saas-random-4.webp",
  "/assets/projects/saas-random-5.webp",
  "/assets/projects/saas-random-6.webp",
  "/assets/projects/saas-random-7.webp",
];
const featureList2: FeatureListItem2[] = [
  {
    title: "Faded Photographs",
    desc: "Each image tells a tale of love, loss, and the relentless passage of time.",
    src: "/assets/projects/saas-random-2.webp",
  },
  {
    title: "Moonlit Reflections",
    desc: "Bathed in the gentle glow of the moon, our thoughts wander through bittersweet reminiscences.",
    src: "/assets/projects/saas-random-3.webp",
  },
  {
    title: "Torn Letters",
    desc: "Words once filled with passion now lie in fragments, scattered like autumn leaves.",
    src: "/assets/projects/saas-random-4.webp",
  },
  {
    title: "Empty Chairs",
    desc: "In abandoned spaces, silent witnesses bear the weight of stories that are no longer told.",
    src: "/assets/projects/saas-random-5.webp",
  },
  {
    title: "Worn Diaries",
    desc: "Pages heavy with sorrow and nostalgia, chronicling moments of delicate, fading joy.",
    src: "/assets/projects/saas-random-6.webp",
  },
  {
    title: "Distant Echoes",
    desc: "A lingering call from the past, echoing softly in the chambers of a weathered heart.",
    src: "/assets/projects/saas-random-7.webp",
  },
];
const Feature2 = ({ pieces }: { pieces: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div ref={ref}>
              <Badge>Memories</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex flex-wrap gap-2">
                <MotionQueue
                  isDynamicallyQueued
                  delayLogic="linear"
                  duration={0.25}
                  elementType="h2"
                  animations={
                    getAnimation({
                      length: feauture2Title.length,
                    }) as AnimationQueueAnimationProps[]
                  }
                  children={feauture2Title.map((text, i) => (
                    <Fragment key={i}>{text}</Fragment>
                  ))}
                  className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left"
                />
              </div>

              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                In the tapestry of solitude, every shadow speaks of a time when
                hope and heartbreak danced as one.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid  lg:grid-cols-3 xl:grid-cols-4 gap-8 text-white">
            <div className="h-full w-full rounded-md aspect-square p-6 flex justify-between flex-col lg:col-span-2 lg:row-span-2 relative">
              <MotionImage
                animations={["filterBlurIn", "scaleZoomIn", "fadeDown"]}
                imageUrl={assets[0]}
                pieces={pieces}
                animationDuration={1}
                delayLogic="cosine"
                isDynamicallyQueued
                controlConfig={{
                  isAnimationStopped: false,
                  isControlled: inView,
                  reverse: false,
                }}
                transition="smooth"
                wrapperClassName="w-full h-full absolute top-0 left-0 -z-10"
                fallback={
                  <Skeleton className="w-full h-full absolute top-0 left-0" />
                }
              />
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Silent Conversations</h3>
                <p className="text-muted max-w-xs text-base">
                  In the quiet depths of the night, whispers of memories echo
                  through the soul, revealing truths we long to forget.
                </p>
              </div>
            </div>
            <MotionQueue
              elementType={"div"}
              delayLogic="linear"
              isDynamicallyQueued
              duration={0.75}
              animations={
                Array.from({ length: featureList2.length }).fill({
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.75,
                  transition: "smooth",
                }) as AnimationQueueAnimationProps[]
              }
              children={featureList2.map((item, i) => (
                <div
                  className="h-full rounded-md aspect-square p-6 flex justify-between flex-col relative"
                  style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  key={i}
                >
                  <User className="w-8 h-8 stroke-1" />
                  <div className="flex flex-col">
                    <h3 className="text-xl tracking-tight">{item.title}</h3>
                    <p className="text-stone-300 max-w-xs text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            />

            <div className=" h-full rounded-md p-6 flex justify-between flex-col lg:col-span-2 relative">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Fleeting Glances</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  A brief encounter with a moment that slips away like a shadow
                  in the twilight.
                </p>
              </div>
              <MotionImageQueue
                isDynamicallyQueued
                animationDuration={4}
                configView={{ once: true, amount: "some" }}
                wrapperClassName="absolute -z-10 w-full h-full top-0 left-0 object-cover"
                delayLogic="sinusoidal"
                fallback={
                  <Skeleton className="bg-transparent w-full h-full absolute" />
                }
                totalDelay={0}
                transition="smooth"
                enterAnimation={["fadeRight", "translate3dIn"]}
                exitAnimation={["fadeLeft", "translate3dOut"]}
                pieces={pieces}
                images={[
                  "/assets/projects/saas-background.webp",
                  "/assets/projects/saas-random-2.webp",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <div className="flex flex-wrap gap-2 w-full" ref={ref}>
            <MotionQueue
              isDynamicallyQueued
              delayLogic="linear"
              duration={0.25}
              elementType="h4"
              animations={
                getAnimation({
                  length: blogTitle.length,
                }) as AnimationQueueAnimationProps[]
              }
              children={blogTitle.map((text, i) => (
                <Fragment key={i}>{text}</Fragment>
              ))}
              className="text-3xl lg:text-5xl tracking-tighter text-left font-regular text-black"
            />
          </div>

          <Button className="gap-4">
            Explore the Archive <MoveRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                isControlled: {
                  trigger: inView,
                },
              } as AnimationQueueAnimationProps) as AnimationQueueAnimationProps[]
            }
            children={Array.from({ length: 4 }).map((_, i) => (
              <Fragment key={i}>
                <Image
                  src={featureList2[i].src}
                  alt="feauture"
                  height={500}
                  width={500}
                  className="rounded-md aspect-video mb-4"
                />
                <h3 className="text-xl tracking-tight">
                  {featureList2[i].title}
                </h3>
                <p className="text-stone-800 tracking-tighter text-base">
                  {featureList2[i].desc}
                </p>
              </Fragment>
            ))}
            className="flex flex-col gap-2 hover:opacity-75 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
