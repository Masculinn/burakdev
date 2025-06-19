import { Skeleton } from "../ui/skeleton";
import MotionImageQueue from "../MotionProvider/motion-image-queue";

const ImageMotionMovie = () => {
  return (
    <MotionImageQueue
      isDynamicallyQueued
      animationDuration={4}
      configView={{ once: true, amount: "some" }}
      delayLogic="sinusoidal"
      fallback={<Skeleton className="bg-transparent w-full h-full absolute" />}
      totalDelay={0}
      transition="smooth"
      enterAnimation={["fadeIn", "filterBlurIn"]}
      exitAnimation={["fadeOut", "spin", "filterBlurOut"]}
      pieces={64}
      images={["/assets/presets/sea.webp", "/assets/presets/moon.webp"]}
    />
  );
};

export default ImageMotionMovie;
