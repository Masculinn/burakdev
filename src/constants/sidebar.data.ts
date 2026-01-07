import {
  Bluesky,
  Buymeacoffee,
  Dailydotdev,
  Github,
  Linkedin,
  X,
} from "@/components/icons/svg-icons";
import type { NavBasicType } from "@/interfaces";

export type DataType = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  projects: Omit<NavBasicType, "icon">[];
  socials: NavBasicType[];
};

const data = {
  user: {
    name: "Burak Bilen",
    email: "hello@burakdev.com",
    avatar: "/burak-bilen.webp",
  },
  projects: [
    {
      title: "Motion Playgrounds",
      url: "https://playground.motionprovider.dev/",
    },
    {
      title: "Motion Docs",
      url: "https://docs.motionprovider.dev",
    },
  ],
  socials: [
    {
      title: "Github",
      url: "https://github.com/Masculinn",
      icon: Github,
    },
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/in/burak-bilen-483772227/",
      icon: Linkedin,
    },
    {
      title: "X",
      url: "https://x.com/devvburak",
      icon: X,
    },
    {
      title: "DailyDev",
      url: "https://app.daily.dev/masculin",
      icon: Dailydotdev,
    },
    {
      title: "Buy Me a Coffee",
      url: "https://buymeacoffee.com/bilenburakf",
      icon: Buymeacoffee,
    },
    {
      title: "Blusky",
      url: "https://bsky.app/profile/burakdev.com",
      icon: Bluesky,
    },
  ],
} as const satisfies DataType;

export default data;
