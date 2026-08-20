import { cn } from "@/lib/utils";
import MotionChain from "@/motion/motion-chain";
import type { MotionAnimationProps } from "@/motion/types";

const items = Array.from({ length: 12 }, (_, i) => {
  const size = 16 + i * 36;
  return (
    <div
      key={i}
      className={cn(
        "rounded-full bg-transparent border",
        `${i % 2 === 0 ? "border-blue-500/50" : "border-rose-500/50"}`,
      )}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
});

const animations = items.map(() => ({
  mode: ["rotateIn", "transformMaskGradient", "fadeUp"],
  transition: "cubicBounce",
  duration: 2.5,
  delay: 0,
})) as MotionAnimationProps[];

export default function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full md:h-80 flex flex-col items-center justify-center absolute text-center  overflow-hidden h-full",
        className,
      )}
    >
      <NotFoundCircle className="-z-10 absolute bottom-0 md:scale-100 scale-75" />
      <h2 className="md:text-5xl text-3xl font-extrabold tracking-tighter leading pb-2 z-10">
        - 404 -
      </h2>
      <p className="text-muted-foreground max-w-md pb-2">
        Oops, you have likely searched something that I have not written yet..
      </p>
    </div>
  );
}

export function NotFoundCircle({ className }: { className?: string }) {
  return (
    <MotionChain
      animations={animations}
      config={{
        duration: 0.15,
        delayLogic: "linear",
      }}
      elementType="div"
      className={className}
      controller={{
        configView: {
          once: false,
          amount: 0.5,
        },
      }}
    >
      {items}
    </MotionChain>
  );
}
