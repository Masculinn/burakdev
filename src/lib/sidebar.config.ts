import { SidebarProps } from "@/interfaces";
import {
  BookOpenText,
  Boxes,
  House,
  Bitcoin,
  Users,
  Rocket,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaX } from "react-icons/fa6";
import { RiNftFill } from "react-icons/ri";

export const sidebarConfig: SidebarProps = {
  user: {
    name: "Burak Bilen",
    email: "hello@burakdev.com",
    avatar: "/burak-bilen.webp",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
  ],
  blogs: [
    {
      title: "Blogs",
      url: "/blogs",
      isActive: true,
      icon: BookOpenText,
      items: [
        {
          title: "Blogs",
          url: "/blogs",
        },
      ],
    },
  ],
  motionProvider: [
    {
      title: "Motion Provider",
      isActive: true,
      url: "/motion-provider",
      icon: Boxes,
      items: [
        {
          title: "Overview",
          url: "/motion-provider/overview",
        },
        {
          title: "Quick Start",
          url: "/motion-provider/quick-start",
        },
        {
          title: "Examples",
          url: "/motion-provider/examples",
        },
        {
          title: "Motion Engine",
          url: "/motion-provider/motion-engine",
        },
        {
          title: "Motion Image Engine",
          url: "/motion-provider/motion-image-engine",
        },
        {
          title: "MotionContainer",
          url: "/motion-provider/motion-container",
        },
        {
          title: "MotionQueue",
          url: "/motion-provider/motion-queue",
        },
        {
          title: "MotionImage",
          url: "/motion-provider/motion-image",
        },
        {
          title: "MotionImageQueue",
          url: "/motion-provider/motion-image-queue",
        },
        {
          title: "Hooks",
          url: "/motion-provider/hooks",
        },
        {
          title: "Centralized Animation System(CAS)",
          url: "/motion-provider/centralized-animation-system",
        },
      ],
    },
  ],
  projects: [
    {
      name: "SaaS",
      url: "/projects/saas",
      complexity: "easy",
      image: "/assets/projects/thumbs/saas-thumb.gif",
      title: "SaaS",
      icon: Rocket,
    },
    {
      name: "Crypto",
      url: "/projects/crypto",
      complexity: "hard",
      image: "/assets/projects/thumbs/crypto-thumb.gif",
      title: "Crypto",
      icon: Bitcoin,
    },
    {
      name: "Agency",
      url: "/projects/agency",
      complexity: "medium",
      image: "/assets/projects/thumbs/agency-thumb.gif",
      title: "Agency",
      icon: Users,
    },
    {
      name: "NFT",
      url: "/projects/nft",
      complexity: "medium",
      image: "/assets/projects/thumbs/nft-thumb.gif",
      title: "NFT",
      icon: RiNftFill,
    },
  ],
  socials: [
    {
      title: "Github",
      url: "https://github.com/Masculinn",
      icon: FaGithub,
    },
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/in/burak-bilen-483772227/",
      icon: FaLinkedin,
    },
    {
      title: "X",
      url: "https://x.com/masculinnnnn",
      icon: FaX,
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/_masculin_",
      icon: FaInstagram,
    },
  ],
};
