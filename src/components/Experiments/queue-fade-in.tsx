import MotionQueue from "../MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";

const rightFadeInMode = ["filterBlurIn", "fadeRight"];
const leftFadeInMode = ["filterBlurIn", "fadeLeft"];

const animations = Array.from({ length: 4 }).map((_, index) => ({
  mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
  duration: 0.5,
  configView: { once: false, amount: 0.5 },
  reverse: false,
  delay: index * 0.1,
  transition: "smooth",
})) as AnimationQueueAnimationProps[];

const QueueFadeIn = () => {
  return (
    <MotionQueue
      duration={0.5}
      elementType="div"
      animations={animations}
      isDynamicallyQueued
    >
      {Array.from({ length: animations.length }).map((_, idx) => (
        <span key={idx} className="text-2xl font-bold">
          Hello There!
        </span>
      ))}
    </MotionQueue>
  );
};

export default QueueFadeIn;
