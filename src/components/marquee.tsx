import type { MarqueeProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import type { FC } from "react";

const Marquee: FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        `group flex overflow-hidden p-2 [--duration:15s] [--gap:1rem] gap-(--gap)`,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          // toggle animation-direction via inline style so it affects the running animation
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
          className={cn("flex shrink-0 justify-around gap-(--gap)", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:paused": pauseOnHover,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
