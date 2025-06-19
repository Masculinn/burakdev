import { Skeleton } from "../ui/skeleton";
import { CodeBadge } from "../Documentation/code-badge";
import MotionImage from "../MotionProvider/motion-image";

const ImageMotionHovered = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full top-0 left-0">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <CodeBadge code="Hover Me!" />
      </div>
      <MotionImage
        isDynamicallyQueued
        totalDelay={2.2}
        animationDuration={2}
        delayLogic="sinusoidal"
        transition="cubicBounce"
        imageUrl="/assets/presets/fractal.gif"
        pieces={64}
        fallback={
          <Skeleton className="w-full h-full absolute top-0 left-0 z-20" />
        }
        wrapperClassName="w-full h-full"
        animations={["rotateIn", "fadeIn", "filterBlurIn"]}
        motionFn="hover"
      />
    </div>
  );
};

export default ImageMotionHovered;
