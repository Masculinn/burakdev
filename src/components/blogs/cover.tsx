import { useIsMobile } from "@/hooks/use-mobile";
import type { BlogType } from "@/interfaces";
import getIcon from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import MotionText from "@/motion/motion-text";
import { Timer } from "lucide-react";
import {
  type PanInfo,
  motion as m,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { LqipImage } from "../lqip-image";
import { Badge } from "../ui/badge";
import { PostDifficulty } from "./post-difficulty";

type CoverProps = Omit<BlogType, "content" | "description"> & {
  readingTime: number | null;
};

export default function Cover({
  banner_image,
  tags,
  id,
  level,
  published_at,
  title,
  readingTime,
}: CoverProps) {
  const sessionId = `SESSION_NO_#${id.toString().padStart(3, "0")}`;

  const date = new Date(published_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="overflow-hidden md:h-auto md:min-h-80 h-auto w-full flex items-center-safe justify-center relative rounded-t-2xl md:p-12 p-6 mb-8">
      <h1 className="font-bold tracking-tighter max-w-2xl text-shadow-2xs z-50 text-4xl md:text-5xl my-16 text-foreground">
        {title}
      </h1>
      <Badge
        variant={"default"}
        className="text-xs absolute top-4 right-4 z-50 font-secondary font-bold"
      >
        {sessionId}
      </Badge>
      <time className="font-secondary text-xs absolute md:bottom-6 md:right-6 bottom-4 right-4 z-50">
        {date}
      </time>
      <LqipImage
        alt={title}
        src={banner_image}
        loading="lazy"
        className="absolute inset-0 object-cover md:object-center size-full -z-10 rounded-2xl"
      />
      <PostDifficulty
        level={level}
        clasName="z-50 text-xs top-4 left-4 absolute"
      />
      <div className="bg-linear-to-b from-transparent dark:to-80% to-background size-full object-contain absolute inset-0" />
      <DraggableCurved items={tags} spinInertia={0.98} />
      {readingTime && (
        <Badge
          variant="outline"
          className="absolute bottom-4 left-4 z-50 font-secondary font-extralight"
        >
          <Timer />
          {Math.ceil(readingTime)} min
        </Badge>
      )}
    </header>
  );
}

type DraggableCurvedType = {
  rotationSpeed?: number;
  dragFactor?: number;
  spinInertia?: number;
  autoSpin?: boolean;
  items: string[];
};

function DraggableCurved({
  rotationSpeed = 0.2,
  dragFactor = 0.01,
  spinInertia = 0.9,
  autoSpin = true,
  items,
}: DraggableCurvedType) {
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const [middleItem, setMiddleItem] = useState(items[0]);
  const angleIncrement = 360 / items.length;

  useMotionValueEvent(rotation, "change", (value) => {
    const adjustedRotation = ((value % 360) + 350) % 360;
    const middleIndex =
      Math.round(adjustedRotation / angleIncrement) % items.length;
    const actualMiddleItem = items[(items.length - middleIndex) % items.length];
    setMiddleItem(actualMiddleItem);
  });

  const onDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentRotation = rotation.get() + info.offset.x * dragFactor;
    rotation.set(currentRotation);
  };

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const endRotation = rotation.get() + info.velocity.x * dragFactor;
    controls.start({
      rotate: endRotation * spinInertia,
      transition: { type: "spring", mass: 0.01, stiffness: 100 },
    });
  };

  useEffect(() => {
    let animationFrame: number;

    if (autoSpin) {
      const spin = () => {
        const currentRotation = rotation.get();
        rotation.set(currentRotation + rotationSpeed);
        animationFrame = requestAnimationFrame(spin);
      };

      animationFrame = requestAnimationFrame(spin);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [rotation, rotationSpeed, autoSpin]);

  const transform = useTransform(rotation, (value) => {
    return `rotate(${value}deg)`;
  });

  if (isMobile) return null;
  return (
    <div className="-right-1/4 w-auto relative md:block hidden">
      <m.div
        className="relative flex size-60 cursor-grab items-center justify-center active:cursor-grabbing"
        animate={controls}
        style={{
          transformOrigin: "center center",
          transform,
          rotate: rotation,
        }}
        drag="x"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {items.map((item, index) => {
          const rotate = angleIncrement * index;
          const Icon = getIcon(item.toLowerCase());

          return (
            <m.div
              key={item}
              className={cn(
                "absolute tracking-tighter  transition-all text-background flex items-center justify-center flex-col pointer-events-none",
                item === middleItem && "text-foreground",
              )}
              style={{
                transform: `rotate(${rotate}deg) translateX(-120px)`,
                transformOrigin: "center center",
              }}
            >
              <Icon
                className="size-6 shrink-0"
                fill="currentColor"
                stroke="none"
              />
              {item === middleItem ? (
                <MotionText
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    transition: "gentle",
                    delay: 0.25,
                    duration: 1,
                  }}
                  config={{
                    duration: 0.06,
                    mode: "chars",
                  }}
                  key={item}
                  elementType={"span"}
                >
                  {item}
                </MotionText>
              ) : (
                <span className="invisible">{item}</span>
              )}
            </m.div>
          );
        })}
      </m.div>
    </div>
  );
}
