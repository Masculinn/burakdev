import MotionContainer from "@/components/MotionProvider/motion-container";

const ContainerDelayedRotateIn = () => {
  return (
    <MotionContainer
      elementType="div"
      configView={{ once: false, amount: "some" }}
      mode={["rotateFlipX", "fadeDown"]}
      transition="smooth"
      duration={1}
      className="w-24 h-24 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500"
      delay={0.5}
    />
  );
};

export default ContainerDelayedRotateIn;
