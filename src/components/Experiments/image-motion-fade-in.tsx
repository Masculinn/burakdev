import { Skeleton } from "../ui/skeleton";
import MotionImage from "../MotionProvider/motion-image";

const ImageMotionFadeIn = () => {
  return (
    <MotionImage
      animations={["translate3dIn", "fadeIn", "filterBlurIn"]}
      imageUrl="/assets/presets/tree.webp"
      pieces={144}
      animationDuration={1}
      delayLogic="sinusoidal"
      configView={{ once: false, amount: "some" }}
      isDynamicallyQueued
      transition="slowElastic"
      fallback={
        <Skeleton className="w-full h-full absolute top-0 left-0 z-20" />
      }
      wrapperClassName="w-full h-full absolute top-0 left-0 inset-0"
    />
  );
};

export default ImageMotionFadeIn;
