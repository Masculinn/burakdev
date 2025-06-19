import MotionContainer from "@/components/MotionProvider/motion-container";
import { FC } from "react";

const ContainerFadeIn: FC = () => {
  return (
    <MotionContainer
      mode={["filterBlurIn", "fadeRight"]}
      configView={{ once: false, amount: 0.5 }}
      elementType={"div"}
      duration={1}
      transition="smooth"
    >
      <h2 className="lg:text-3xl font-bold">Hello World</h2>
    </MotionContainer>
  );
};

export default ContainerFadeIn;
