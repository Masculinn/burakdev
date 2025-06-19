import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import { FC, Fragment } from "react";

const SessionText: FC<{ text: string }> = ({ text }) => (
  <div className="flex flex-wrap gap-2">
    <MotionQueue
      elementType={"span"}
      animations={
        Array.from({ length: text.split(/\s+/).length }).fill({
          mode: ["filterBlurIn", "fadeRight"],
          duration: 1,
          configView: { once: false, amount: 0.5 },
        }) as AnimationQueueAnimationProps[]
      }
      isDynamicallyQueued
      children={text.split(/\s+/).map((val) => (
        <Fragment key={val}>{val}</Fragment>
      ))}
      delayLogic="linear"
      duration={0.5}
    />
  </div>
);

export default SessionText;
