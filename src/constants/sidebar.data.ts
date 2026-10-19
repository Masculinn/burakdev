import {
  Bluesky,
  Dailydotdev,
  Github,
  Linkedin,
} from "@/components/icons/svg-icons";
import slugs from "@/generated/slugs.json" with { type: "json" };
import type { NavBasicType } from "@/interfaces";
import {
  BookOpenTextIcon,
  EllipsisIcon,
  HomeIcon,
  LibraryIcon,
} from "lucide-react";

const socialsData = {
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
};

const platformData = [
  {
    title: "Home",
    icon: HomeIcon,
    url: "/",
  },
  {
    title: "Articles",
    icon: LibraryIcon,
    url: "/blogs",
  },
] as const satisfies NavBasicType[];

const articlesData: NavBasicType[] = slugs
  .reverse()
  .slice(0, 3)
  .map((slug) => ({
    ...slug,
    url: `/blogs/${slug.url}`,
    icon: BookOpenTextIcon,
  }))
  .concat({
    url: "/blogs",
    title: "See All",
    icon: EllipsisIcon,
  });

export { articlesData, platformData, socialsData };
