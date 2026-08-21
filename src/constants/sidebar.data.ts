import {
  Bluesky,
  Dailydotdev,
  Github,
  Linkedin,
} from "@/components/icons/svg-icons";
import type { NavBasicType } from "@/interfaces";

export type DataType = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  socials: NavBasicType[];
};

const data = {
  user: {
    name: "Burak Bilen",
    email: "hello@burakdev.com",
    avatar: "/burak-bilen.webp",
  },
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
      title: "DailyDev",
      url: "https://app.daily.dev/masculin",
      icon: Dailydotdev,
    },
    {
      title: "Blusky",
      url: "https://bsky.app/profile/burakdev.com",
      icon: Bluesky,
    },
  ],
} as const satisfies DataType;

export default data;
