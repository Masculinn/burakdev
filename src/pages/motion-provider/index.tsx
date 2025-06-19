import Head from "next/head";
import { Card as CardContainer } from "@/components/ui/card";
import { OverviewCardProps } from "@/interfaces";
import { Boxes, Code, FlaskConical, TableOfContents } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import MotionContainer from "@/components/MotionProvider/motion-container";
import MotionQueue from "@/components/MotionProvider/motion-queue";

const codeFont = Geist_Mono({ weight: "400", subsets: ["latin"] });

const cards: OverviewCardProps[] = [
  {
    title: "Overview",
    desc: "Discover the core features of our React animation library.",
    icon: <TableOfContents className="w-8 h-8" />,
    link: "/motion-provider/overview",
  },
  {
    title: "Quick Start",
    desc: "Start animating your components in just a few steps.",
    icon: <Code />,
    link: "/motion-provider/quick-start",
  },
  {
    title: "Examples",
    desc: "Explore practical examples to kickstart your animations.",
    icon: <Boxes className="w-8 h-8" />,
    link: "/motion-provider/examples",
  },
  {
    title: "Motion Engine",
    desc: "Power your animations with a high-performance engine.",
    icon: <FlaskConical />,
    link: "/motion-provider/motion-engine",
  },
];

const animations = Array.from({ length: cards.length }).fill({
  mode: ["filterBlurIn", "fadeRight"],
  duration: 0.5,
  configView: { once: false, amount: 0.5 },
  reverse: false,
  delay: 0,
  transition: "smooth",
} as AnimationQueueAnimationProps);

export default function MotionProvider() {
  return (
    <>
      <Head>
        <title>burakdev | Motion Provider</title>
        <meta
          name="description"
          content="Discover the core features of our React animation library with Motion Provider."
        />
        <meta property="og:title" content="Motion Provider" />
        <meta
          property="og:description"
          content="Discover the core features of our React animation library with Motion Provider."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider"
        />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <section className="w-full h-3/4 lg:p-0">
        <div className="h-1/2 max-w-md mx-auto justify-center flex items-center flex-col gap-2">
          <MotionContainer
            elementType="div"
            configView={{ once: true, amount: 0.5 }}
            mode={["filterBlurIn", "fadeUp"]}
            transition="smooth"
            duration={1}
            delay={0}
            children={
              <h1 className="lg:text-5xl text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Motion Provider
              </h1>
            }
          />
          <MotionContainer
            elementType="h1"
            configView={{ once: true, amount: 0.5 }}
            mode={["filterBlurIn", "fadeIn"]}
            transition="delayedCubic"
            duration={0.5}
            className="text-center text-sm"
            delay={1}
            children="Accelerate your React component animations by up to 4x with seamless
              performance and precision, built entirely in React and TypeScript
              for a smooth, type-safe development experience."
          />
        </div>
        <div className="w-full h-1/2 grid grid-cols-2 lg:gap-4 gap-2 lg:my-0 lg:py-4">
          <MotionQueue
            duration={0.5}
            elementType={"div"}
            delayLogic="linear"
            children={cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
            animations={animations as AnimationQueueAnimationProps[]}
            isDynamicallyQueued
          />
        </div>
      </section>
    </>
  );
}

const Card = ({ title, desc, icon, link }: OverviewCardProps) => {
  return (
    <CardContainer className="h-full w-full dark:hover:bg-stone-800 hover:bg-stone-100 cursor-pointer">
      <Link
        href={link}
        className=" flex flex-row lg:gap-6 gap-2 justify-center items-center lg:px-8 px-4 w-full h-full"
      >
        <div className="lg:w-16 lg:h-16 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
        <div className="lg:w-full w-auto h-full items-start justify-center flex flex-col truncate overflow-clip">
          <h2 className={`${codeFont.className} font-bold text-sm`}>{title}</h2>
          <p className="tracking-tighter text-xs text-stone-400 lg:block hidden">
            {desc}
          </p>
        </div>
      </Link>
    </CardContainer>
  );
};
