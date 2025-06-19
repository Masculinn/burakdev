import MotionContainer from "@/components/MotionProvider/motion-container";
import { ViewAnimationControllerProps } from "@/components/MotionProvider/types";
import { FC } from "react";

interface NestedAnimationProps {
  config: Partial<ViewAnimationControllerProps[]>;
  children?: React.ReactNode;
}

const NestedAnimation: FC<NestedAnimationProps> = ({ config, children }) => {
  const animations = (currIdx: number): React.ReactNode => {
    if (currIdx >= config.length) return children;

    const currConfig = config[currIdx];

    return (
      <MotionContainer
        {...currConfig}
        elementType={currConfig?.elementType || "div"}
        configView={currConfig?.configView || { once: true, amount: "some" }}
        mode={currConfig?.mode || []}
      >
        {animations(currIdx + 1)}
      </MotionContainer>
    );
  };

  return animations(0);
};

const config = [
  {
    elementType: "div",
    configView: { once: false, amount: "some" },
    mode: ["spin", "fadeIn", "filterBlurIn"],
    transition: "cubicElastic",
    duration: 1,
    className:
      "w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 items-center justify-center flex",
    delay: 0.5,
  },
  {
    elementType: "div",
    configView: { once: false, amount: "some" },
    mode: ["rotateFlipY", "filterBlurIn", "fadeIn"],
    transition: "smooth",
    duration: 1,
    className:
      "w-2/3 h-2/3 rounded-lg bg-gradient-to-l from-rose-500 via-fuchsia-500 to-cyan-400 items-center justify-center flex",
    delay: 1.5,
  },
  {
    elementType: "div",
    configView: { once: false, amount: "some" },
    mode: ["rotateFlipX", "fadeUp", "elasticBounce"],
    transition: "smooth",
    duration: 1,
    className:
      "w-1/2 h-1/2 rounded-lg bg-gradient-to-l from-yellow-500 via-rose-500 to-cyan-400",
    delay: 2.5,
  },
] as NestedAnimationProps["config"];

const ContainerNested = () => {
  return <NestedAnimation config={config} />;
};

export default ContainerNested;
