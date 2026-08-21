import { MotionText } from "@/motion/components/motion-text";
import type { FC } from "react";

type TitleProps = {
  title: string;
};

export const ProjectTitle: FC<TitleProps> = ({ title }) => (
  <MotionText
    elementType="span"
    animation={{
      mode: ["textShimmer", "transformRevealRight"],
      transition: "gentle",
      delay: 0.15,
      duration: 0.8,
    }}
    config={{
      mode: "chars",
      duration: 0.05,
      delayLogic: "linear",
    }}
  >
    {title}
  </MotionText>
);
