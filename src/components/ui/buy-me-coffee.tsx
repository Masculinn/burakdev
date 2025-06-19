import React, { FC, useRef } from "react";
import { Skeleton } from "./skeleton";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Geist_Mono } from "next/font/google";
import MotionImage from "../MotionProvider/motion-image";
import MotionQueue from "../MotionProvider/motion-queue";

const headerText = "Buy Me A Coffee!";
const headerArr = headerText.split(/\s+/);

const font = Geist_Mono({ subsets: ["latin"], weight: "600" });

const BuyMeCoffee: FC<{ style?: string; justCoffee?: boolean }> = ({
  style,
  justCoffee,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isMobile = useIsMobile();
  const animations = ["filterBlurIn", "fadeRight", "cubicElastic"];

  return (
    <Link
      target="_blank"
      ref={ref}
      href="https://buymeacoffee.com/bilenburakf"
      className={cn(
        justCoffee
          ? "items-center justify-center flex bg-transparent border p-1 rounded-lg hover:bg-[#FF813F] hover:text-white"
          : "inline-flex items-center h-8 leading-loose no-underline text-white bg-[#FF813F] rounded-[5px] border border-transparent py-[0.7rem] px-4 text-[2rem] tracking-[0.6px] shadow-[0px_1px_2px_rgba(190,190,190,0.5)] transition-all duration-300 ease-linear font-[cursive] hover:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] hover:opacity-85 focus:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] focus:opacity-85 active:shadow-[0px_1px_2px_2px_rgba(190,190,190,0.5)] active:opacity-85 relative lg:scale-100 scale-90",
        style
      )}
    >
      <MotionImage
        isDynamicallyQueued
        totalDelay={0.5}
        animationDuration={1}
        delayLogic="sinusoidal"
        transition="cubicElastic"
        imageUrl={"https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"}
        pieces={64}
        fallback={<Skeleton className="h-[25px] w-[27px] rounded-full" />}
        elementClassname="h-full w-full shadow-none border-none"
        wrapperClassName="h-[25px] w-[27px] shadow-none border-none"
        animations={["rotating360", "translate3dIn"]}
        controlConfig={{
          isControlled: true,
          reverse: false,
          isAnimationStopped: false,
        }}
      />
      {!justCoffee && (
        <div
          className={cn(
            `flex flex-row gap-1 ml-[15px] h-auto text-center ${
              isMobile && font.className
            }`
          )}
        >
          <MotionQueue
            key={2}
            elementType="span"
            duration={0.1}
            delayLogic="linear"
            isDynamicallyQueued
            className="text-sm tracking-tight text-center"
            animations={
              Array.from({ length: headerArr.length }).fill({
                mode: animations,
                transition: "cubicBounce",
                duration: 1,
              }) as AnimationQueueAnimationProps[]
            }
            children={headerArr.map((val) => val)}
          />
        </div>
      )}
    </Link>
  );
};

export default BuyMeCoffee;
