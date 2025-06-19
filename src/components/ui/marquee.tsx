import { MarqueeProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC } from "react";

const Marquee: FC<MarqueeProps> = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 15,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        `group flex overflow-hidden p-2 [--duration:15s] [--gap:1rem] [gap:var(--gap)] `,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array.from({ length: repeat })
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
