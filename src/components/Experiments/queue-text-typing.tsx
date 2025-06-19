import { FC } from "react";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import MotionQueue from "../MotionProvider/motion-queue";

const text = "Animate Like A Pro!".split(/\s+/);

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

export default QueueTextTyping;
