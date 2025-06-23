import { ComponentBannerCardProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
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
        fallback={<Skeleton className="size-full absolute" />}
        animationDuration={imageAnimationDuration}
        transition={transition}
        delayLogic={delayLogic}
        isDynamicallyQueued
        totalDelay={0.5}
        wrapperClassName="size-full absolute rounded-xl object-contain inset-0"
      />
      <div className="inset-0 absolute bg-gradient-to-t from-stone-900/60 to-stone-900/0" />
      <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-center z-20">
        {title}
      </h1>

      <p className="lg:text-sm z-20 text-xs lg:flex hidden lg:max-w-lg">
        {description}
      </p>
    </div>
  );
};
