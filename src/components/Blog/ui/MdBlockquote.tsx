import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import extractTextFromReactNode from "@/utils/extractTextFromReactNode";
import { Info } from "lucide-react";
import React, { FC } from "react";

export const MdBlockquote: FC<React.HTMLAttributes<HTMLQuoteElement>> = ({
  className,
  ...props
}) => {
  const text = extractTextFromReactNode(props.children).split(/\s+/);

  return (
    <blockquote className="flex flex-col gap-2 my-6">
      <Alert>
        <AlertTitle className="font-bold lg:text-xl text-lg text-primary flex flex-row-reverse gap-2 justify-between">
          <Info />
          <span>Burak Says,</span>
        </AlertTitle>
        <AlertDescription className="text-muted-foreground text-sm flex flex-wrap gap-1 -ml-1 my-2">
          <MotionQueue
            elementType={"span"}
            animations={
              Array.from({ length: text.length }).fill({
                mode: ["filterBlurIn", "fadeRight"],
                duration: 0.88,
                configView: { once: false, amount: 0.5 },
              }) as AnimationQueueAnimationProps[]
            }
            isDynamicallyQueued
            delayLogic="linear"
            duration={0.25}
            children={text}
          />
        </AlertDescription>
      </Alert>
    </blockquote>
  );
};
