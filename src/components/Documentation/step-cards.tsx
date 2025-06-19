import { FC } from "react";
import { StepsCardProps } from "@/interfaces";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import MotionQueue from "../MotionProvider/motion-queue";

export const StepCards: FC<StepsCardProps> = ({ data }) => {
  if (!data) {
    console.warn("No Data Provided on StepCards Component!");
    return null;
  }

  const animations = Array.from({ length: data?.length }).map((_, index) => ({
    mode: index % 2 === 0 ? "fadeRight" : "fadeLeft",
    duration: 1,
    configView: { once: true, amount: 0.5 },
    transition: "smooth",
  })) as AnimationQueueAnimationProps[];

  const children = data?.map((item, index) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle>
          {(index + 1).toString()}. {item.title}
        </CardTitle>
        <CardDescription>{item.desc}</CardDescription>
      </CardHeader>
    </Card>
  ));

  return (
    <MotionQueue
      elementType="div"
      isDynamicallyQueued
      animations={animations}
      children={children}
      className="my-4 text-base text-muted-foreground tracking-tighter flex flex-col gap-4"
    />
  );
};
