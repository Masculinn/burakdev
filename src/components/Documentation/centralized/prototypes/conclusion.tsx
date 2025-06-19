import { AnimationKeys } from "@/components/MotionProvider/types";
import { StepCardDataProps } from "@/interfaces";
import { Fragment } from "react";
import { StepCards } from "../../step-cards";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import MotionContainer from "@/components/MotionProvider/motion-container";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";

const texts = [
  "Thank you for being here and taking the time to explore this project. 🌟 Over the past month, I’ve poured 100+ hours of passion into crafting this project, aiming to give you everything you need to bring your creative visions to life—without compromises. Do not forget everything free-to-use, open-sourced for the developer who has real passion to make the web better!".split(
    /\s+/
  ),
  "With this, you can build: 🚀 Stunning SaaS platforms, 🎯 Pixel-perfect landing pages, 💼 Portfolios that captivate clients,".split(
    /\s+/
  ),
  "...and truly, anything you imagine.".split(/\s+/),
  "No need to google for animations, No need to copy paste entire complicated components that you feel extremely confused instead here you are simply going through the engines, If you do not have idea about the animations you want to generate kindly press 'roll a dice' button and let the engines generates you fully unique animations among 21,840 animation combination.".split(
    /\s+/
  ),
  "But here’s my truth: I built this not for profit, but for you. To empower creators, to simplify animation, and to see what amazing things you’ll build. If this project sparks joy for you or saves you time, consider supporting by:".split(
    /\s+/
  ),
] as string[][];

const share =
  "No pressure, ever. Your excitement and creativity are what keep this project alive.".split(
    /\s+/
  );
const supportCards = [
  {
    title: "☕ Buying me a delicious coffee (every sip fuels new features!)",
    desc: <BuyMeCoffee />,
  },
  {
    title: "📣 Share the Project (tag me—I’d love to cheer for your work!)",
    desc: (
      <div className="flex flex-wrap gap-1">
        <MotionQueue
          key={8}
          className="lg:text-lg  font-bold"
          elementType="span"
          children={share.map((text, i) => (
            <Fragment key={i}>{text}</Fragment>
          ))}
          animations={share.map((_) => ({
            mode: ["filterBlurIn", "fadeIn"] as AnimationKeys[],
            duration: 1,
            transition: "smooth",
          }))}
          isDynamicallyQueued
          duration={0.1}
        />
      </div>
    ),
  },
] as StepCardDataProps[];
const animation = ["filterBlurIn", "fadeIn"];

const Conclusion = () => {
  return (
    <section className="my-8">
      <div className="w-full h-auto items-start justify-start flex flex-col">
        <MotionContainer
          elementType={"h3"}
          mode={animation as AnimationKeys[]}
          className="lg:text-3xl text-2xl font-bold mb-4"
          children={"Dear Fellow Developer,"}
          duration={1}
          configView={{ once: true, amount: "some" }}
          transition="smooth"
        />
        <div className="flex flex-wrap gap-2 my-12">
          <MotionQueue
            key={1}
            className="lg:text-3xl text-2xl font-bold"
            elementType="span"
            children={texts[0].map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            animations={texts[0].map((_, i) => ({
              mode: animation as AnimationKeys[],
              duration: 1,
              transition: "smooth",
            }))}
            isDynamicallyQueued
            duration={0.1}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <MotionQueue
            key={2}
            className="lg:text-3xl text-2xl font-bold"
            elementType="span"
            children={texts[1].map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            animations={texts[1].map((_) => ({
              mode: animation as AnimationKeys[],
              duration: 1,
              transition: "smooth",
            }))}
            isDynamicallyQueued
            duration={0.1}
          />
        </div>
        <div className="flex flex-wrap gap-2 my-12">
          <MotionQueue
            key={3}
            className="lg:text-3xl text-2xl font-bold"
            elementType="span"
            children={texts[2].map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            animations={texts[2].map((_) => ({
              mode: ["filterBlurIn", "rotateFlipX"] as AnimationKeys[],
              duration: 1,
              transition: "smooth",
            }))}
            isDynamicallyQueued
            duration={0.1}
          />
        </div>
        <div className="flex flex-wrap gap-2 my-8">
          <MotionQueue
            className="lg:text-3xl text-2xl font-bold"
            elementType="span"
            children={texts[3].map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            animations={texts[3].map((_) => ({
              mode: animation as AnimationKeys[],
              duration: 1,
              transition: "smooth",
            }))}
            isDynamicallyQueued
            duration={0.1}
          />
        </div>
        <div className="flex flex-wrap gap-2 my-8">
          <MotionQueue
            className="lg:text-2xl text-xl font-bold"
            elementType="span"
            children={texts[4].map((text, i) => (
              <Fragment key={i}>{text}</Fragment>
            ))}
            animations={texts[4].map((_) => ({
              mode: ["textShimmer"] as AnimationKeys[],
              duration: 1,
              transition: "smooth",
            }))}
            isDynamicallyQueued
            duration={0.1}
          />
        </div>
      </div>
      <div className="w-full h-auto items-start justify-start flex flex-col">
        <StepCards data={supportCards} />
      </div>
    </section>
  );
};

export default Conclusion;
