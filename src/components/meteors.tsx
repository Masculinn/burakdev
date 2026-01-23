import { cn, getRandomColor } from "@/lib/utils";
import dynamic from "next/dynamic";

const meteorCount = 20,
  createMeteors = Array.from({ length: meteorCount }).map(getRandomColor);

const Meteors = dynamic(
  () =>
    Promise.resolve(() => (
      <div className="absolute top-0 left-0 size-full -z-10">
        {createMeteors.map((c, idx) => {
          const position = idx * 40;
          return (
            <span
              key={`meteor-${idx}`}
              className={cn(
                "animate-meteor-effect absolute size-0.5 rotate-45 rounded-full",
                "before:absolute before:top-1/2 before:h-px before:w-12.5 before:-translate-y-[50%] before:transform before:content-['']",
                "before:bg-linear-to-r before:from-(--meteor-color) before:to-transparent",
              )}
              style={{
                top: "-40px",
                left: `${position}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.floor(
                  Math.random() * (10 - 2) + 5,
                )}s`,
                ["--meteor-color" as string]: c,
              }}
            />
          );
        })}
      </div>
    )),
  { ssr: false },
);

export default Meteors;
