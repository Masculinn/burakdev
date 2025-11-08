import type { AnimationKeys } from "@/motion/constants/animations";
import MotionText from "@/motion/motion-text";
import { useRouter } from "next/router";
import { useState } from "react";

type CustomDelay = {
  delay?: number;
};

const REDIRECTION_LINK = "https://www.youtube.com/watch?v=eyaMGdYIdUQ";

function Mq1({ delay }: CustomDelay) {
  const router = useRouter();
  const [key, setKey] = useState<number>(1);
  const [_delay, _setDelay] = useState<number>(delay ?? 0);

  const handleClick = () => {
    _setDelay(0);

    if (key + 1 <= 5) setKey((prev) => prev + 1);
    else router.push(REDIRECTION_LINK);
  };

  return (
    <MotionText
      elementType="span"
      animation={{
        mode: [
          "fadeIn",
          "filterBlurIn",
          `heartbeatHard${key}` as AnimationKeys,
        ],
        transition: "cubicBounce",
        duration: _delay !== 0 ? 2 : 1.5,
        delay: _delay,
      }}
      controller={{
        trigger: true,
      }}
      onClick={handleClick}
      config={{
        duration: 0.25,
        mode: "words",
        delayLogic: "linear",
      }}
      key={key}
      wrapperClassName="inline text-amber-500 text-shadow-2xs cursor-pointer hover:text-amber-600"
    >
      5+ years
    </MotionText>
  );
}

export { Mq1 };
