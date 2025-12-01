import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import slugs from "@/generated/slugs.json" with { type: "json" };
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import MotionChain from "@/motion/motion-chain";
import MotionContainer from "@/motion/motion-container";
import MotionText from "@/motion/motion-text";
import type { MotionAnimationProps } from "@/motion/types";
import { Dice6 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [trigger, setTrigger] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const redirectUserToRandomPage = () => {
    const post = slugs[Math.floor(Math.random() * slugs.length)].url;
    router.push(`/blogs/${post}`);
  };

  return (
    <div
      className={cn(
        "w-full h-80 flex flex-col items-center justify-center absolute text-center  overflow-hidden",
        className,
      )}
    >
      <NotFoundCircle className="-z-10 absolute bottom-0 md:scale-100 scale-75" />
      <MotionText
        elementType="h2"
        animation={{
          mode: ["fadeIn", "filterBlurIn", "flash"],
          transition: "fadeRotate",
          duration: 1,
        }}
        config={{
          duration: 0.08,
          mode: "chars",
          delayLogic: "linear",
        }}
        wrapperClassName="md:text-5xl text-3xl font-extrabold tracking-tighter leading pb-2 z-10"
      >
        - 404 -
      </MotionText>
      <p className="text-muted-foreground max-w-md pb-2">
        Oops, you have likely searched something that I have not written yet..
      </p>
      <Item variant="default" size="sm">
        <button
          type="button"
          onClick={redirectUserToRandomPage}
          onMouseEnter={() => setTrigger(true)}
          onMouseLeave={() => setTrigger(false)}
          className="max-w-2xl flex backdrop-blur-xs md:w-96 w-full overflow-hidden p-4"
        >
          <ItemContent>
            <ItemTitle>Tomorrow is a brand new day 🤞</ItemTitle>
            <ItemDescription className="text-start">
              Get a random post instead
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            {isMobile ? (
              <Dice6 className="size-6 " />
            ) : (
              <MotionContainer
                animation={{
                  mode: ["translate3dRotate", "filterBlurIn"],
                  transition: "gentle",
                  duration: 1,
                }}
                elementType="div"
                controller={{
                  trigger,
                  configView: {
                    once: false,
                    amount: 0.5,
                  },
                }}
                className="relative"
              >
                <Dice6 className="size-7 " />
              </MotionContainer>
            )}
          </ItemActions>
        </button>
      </Item>
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
