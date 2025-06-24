import { Card } from "@/components/ui/card";
import ContainerDelayedRotateIn from "@/components/Experiments/container-delayed-rotate-in";
import MotionContainer from "@/components/MotionProvider/motion-container";
import { CardContent, CardTitle } from "@/components/ui/card";
import ContainerFadeIn from "@/components/Experiments/container-fade-in";
import ImageMotionFadeIn from "@/components/Experiments/image-motion-fade-in";
import ImageMotionHovered from "@/components/Experiments/image-motion-hovered";
import ImageMotionMovie from "@/components/Experiments/image-motion-movie";
import QueueFadeIn from "@/components/Experiments/queue-fade-in";
import QueueTextTyping from "@/components/Experiments/queue-text-typing";

interface myExperimentComponentsProps {
  node: React.ReactNode;
  name: string;
}
const myExperimentComponents = [
  {
    name: "ContainerDelayedRotateIn",
    node: <ContainerDelayedRotateIn />,
  },
  {
    name: "ContainerFadeIn",
    node: <ContainerFadeIn />,
  },
  {
    name: "ImageMotionFadeIn",
    node: <ImageMotionFadeIn />,
  },
  {
    node: <ImageMotionHovered />,
    name: "ImageMotionHovered",
  },
  {
    node: <ImageMotionMovie />,
    name: "ImageMotionMovie",
  },
  {
    node: <QueueFadeIn />,
    name: "QueueFadeIn",
  },
  {
    node: <QueueTextTyping />,
    name: "QueueTextTyping",
  },
] as myExperimentComponentsProps[];

export default function Experiments() {
  return (
    <>
      <MotionContainer
        elementType={"div"}
        mode={["rotateFlipX", "fadeDown"]}
        transition="smooth"
        duration={1}
        delay={0.5}
      >
        Welcome to Experiments Page!
      </MotionContainer>
      <p>Here is the random experiments from me using Motion Provider:</p>
      {myExperimentComponents.map((item) => (
        <Card className="my-4 p-8 items-center flex flex-col justify-center">
          <CardTitle className="flex gap-2 items-center">
            {" "}
            <pre lang="tsx">{item.name}</pre>
          </CardTitle>
          <CardContent>{item.node}</CardContent>
        </Card>
      ))}
    </>
  );
}
