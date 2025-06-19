import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

interface SocialItem {
  icon: React.ReactNode;
  link: string;
}

const socialItems: SocialItem[] = [
  {
    icon: <FaGithub className="transition-all duration-200 hover:scale-110" />,
    link: "https://github.com/Masculinn",
  },
  {
    icon: <FiX className="transition-all duration-200 hover:scale-110" />,
    link: "https://x.com/burak_dev",
  },
  {
    icon: (
      <FaLinkedin className="transition-all duration-200 hover:scale-110" />
    ),
    link: "https://www.linkedin.com/in/burak-bilen-483772227",
  },
  {
    icon: (
      <FaInstagram className="transition-all duration-200 hover:scale-110" />
    ),
    link: "https://www.instagram.com/_masculin_/",
  },
];

const animations = Array.from({ length: socialItems.length }).fill({
  mode: ["filterBlurIn", "fadeRight", "burakHeartbeat", "translate3dIn"],
  duration: 0.5,
  reverse: false,
  delay: 0,
  transition: "smooth",
} as AnimationQueueAnimationProps);

const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      <MotionQueue
        animations={animations as AnimationQueueAnimationProps[]}
        elementType="div"
        children={socialItems.map((val, idx) => (
          <Link
            key={idx}
            href={val.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {val.icon}
          </Link>
        ))}
        delayLogic="sinusoidal"
        duration={1}
        isDynamicallyQueued
        key="social-animations"
      />
      <BuyMeCoffee style="lg:scale-100" justCoffee />
    </div>
  );
};

export default Socials;
