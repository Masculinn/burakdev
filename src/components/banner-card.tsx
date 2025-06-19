import { ComponentBannerCardProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import MotionContainer from "./MotionProvider/motion-container";
import MotionImage from "./MotionProvider/motion-image";

export const BannerCard: FC<ComponentBannerCardProps> = ({
  className,
  description,
  title,
  transition = "cubicElastic",
  src = "/assets/components/banner-bg.webp",
  theme,
  controlConfig,
  imageAnimationDuration = 1,
  delayLogic = "chaotic",
  animations = ["fadeIn"],
  duration,
  delayed,
}) => {
  const appTheme = useMemo(() => theme, [theme]);

  return (
    <div
      className={cn(
        "w-full lg:h-1/3 h-1/4 rounded-xl items-center justify-center text-center lg:px-0 px-12 flex flex-col gap-2 relative",
        className
      )}
    >
      <MotionImage
        key={src}
        controlConfig={controlConfig}
        animations={
          appTheme !== "dark"
            ? [...animations, "filterInvertColors"]
            : animations
        }
        imageUrl={src}
        pieces={144}
        fallback={<Skeleton className="w-full h-full absolute" />}
        animationDuration={imageAnimationDuration}
        transition={transition}
        delayLogic={delayLogic}
        isDynamicallyQueued
        totalDelay={0.5}
        wrapperClassName="w-full h-full absolute rounded-xl"
      />
      <MotionContainer
        configView={{ once: true, amount: 0.5 }}
        elementType={"h1"}
        mode={["filterBlurIn", "fadeIn"]}
        duration={duration ?? 1}
        delay={delayed ?? 0}
        className="text-2xl lg:text-4xl font-bold tracking-tight text-center"
        transition="smooth"
        children={title}
      />

      <MotionContainer
        configView={{ once: true, amount: 0.5 }}
        elementType={"div"}
        mode={["filterBlurIn", "fadeIn"]}
        className="overflow-hidden"
        transition="delayedSmooth"
        delay={delayed ? Math.sqrt(delayed) : 0}
        duration={duration ?? 1}
      >
        <p className="lg:text-sm text-xs">{description}</p>
      </MotionContainer>
    </div>
  );
};
