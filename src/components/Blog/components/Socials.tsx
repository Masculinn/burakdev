import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

interface SocialItem {
  icon: React.ReactNode;
  link: string;
}

const socialItems: SocialItem[] = [
  {
    icon: (
      <FaGithub className="md:transition-all md:duration-200 md:hover:scale-110 size-5" />
    ),
    link: "https://github.com/Masculinn",
  },
  {
    icon: (
      <FaTwitter className="md:transition-all md:duration-200 md:hover:scale-110 size-5" />
    ),
    link: "https://x.com/devvburak",
  },
  {
    icon: (
      <FaLinkedin className="md:transition-all md:duration-200 md:hover:scale-110 size-5" />
    ),
    link: "https://www.linkedin.com/in/burak-bilen-483772227",
  },
  {
    icon: (
      <FaInstagram className="md:transition-all md:duration-200 md:hover:scale-110 size-5" />
    ),
    link: "https://www.instagram.com/_masculin_/",
  },
];

const animations = Array.from({ length: socialItems.length }).fill({
  mode: ["filterBlurIn", "fadeRight"],
  duration: 0.5,
  reverse: false,
  delay: 0,
  transition: "smooth",
} as AnimationQueueAnimationProps);

const Socials = () => {
  return (
    <div className="mb-2 flex flex-row items-center justify-start w-full md:gap-4 gap-3">
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
      <BuyMeCoffee style="lg:scale-100 " justCoffee />
    </div>
  );
};

export default Socials;
