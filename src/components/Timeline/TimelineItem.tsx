import { TimelineItemProps } from "@/interfaces";
import React, { FC, JSX } from "react";
import ZoomableImage from "../ui/zoomable-image";
import { Badge } from "../ui/badge";
import Ping from "../ui/ping";
import { Geist_Mono } from "next/font/google";
import {
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPhp,
  FaReact,
  FaShopify,
  FaBitcoin,
} from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Marquee from "../ui/marquee";
import {
  SiDotnet,
  SiGraphql,
  SiJavascript,
  SiJquery,
  SiJson,
  SiNextdotjs,
  SiPostgresql,
  SiRedux,
  SiRemix,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiXml,
  SiShadcnui,
} from "react-icons/si";
import { GiSpring } from "react-icons/gi";
import { RiSupabaseFill } from "react-icons/ri";
import { TbBrandFramerMotion, TbBrandThreejs } from "react-icons/tb";
import { Lightbulb } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const geistMono = Geist_Mono({ subsets: ["latin"] });

const techIconMap: Record<string, JSX.Element> = {
  React: <FaReact className="lg:w-6 lg:h-6 w-4 h-4" />,
  Redux: <SiRedux className="lg:w-6 lg:h-6 w-4 h-4" />,
  "Next.js": <SiNextdotjs className="lg:w-6 lg:h-6 w-4 h-4" />,
  Remix: <SiRemix className="lg:w-6 lg:h-6 w-4 h-4" />,
  TailwindCSS: <SiTailwindcss className="lg:w-6 lg:h-6 w-4 h-4" />,
  TypeScript: <SiTypescript className="lg:w-6 lg:h-6 w-4 h-4" />,
  Motion: <TbBrandFramerMotion className="lg:w-6 lg:h-6 w-4 h-4" />,
  Shadcn: <SiShadcnui className="lg:w-6 lg:h-6 w-4 h-4" />,
  Supabase: <RiSupabaseFill className="lg:w-6 lg:h-6 w-4 h-4" />,
  PostgreSQL: <SiPostgresql className="lg:w-6 lg:h-6 w-4 h-4" />,
  JavaScript: <SiJavascript className="lg:w-6 lg:h-6 w-4 h-4" />,
  XML: <SiXml className="lg:w-6 lg:h-6 w-4 h-4" />,
  SAP: <SiDotnet className="lg:w-6 lg:h-6 w-4 h-4" />,
  "Microsoft .NET XAF": <FaNodeJs className="lg:w-6 lg:h-6 w-4 h-4" />,
  Bcrypt: <FaBitcoin className="lg:w-6 lg:h-6 w-4 h-4" />,
  "react-spring": <GiSpring className="lg:w-6 lg:h-6 w-4 h-4" />,
  "Three.js": <TbBrandThreejs className="lg:w-6 lg:h-6 w-4 h-4" />,
  Shopify: <FaShopify className="lg:w-6 lg:h-6 w-4 h-4" />,
  "Core JavaScript": <SiJavascript className="lg:w-6 lg:h-6 w-4 h-4" />,
  CSS: <FaCss3Alt className="lg:w-6 lg:h-6 w-4 h-4" />,
  HTML: <FaHtml5 className="lg:w-6 lg:h-6 w-4 h-4" />,
  php: <FaPhp className="lg:w-6 lg:h-6 w-4 h-4" />,
  sql: <SiPostgresql className="lg:w-6 lg:h-6 w-4 h-4" />,
  mysql: <SiPostgresql className="lg:w-6 lg:h-6 w-4 h-4" />,
  jquery: <SiJquery className="lg:w-6 lg:h-6 w-4 h-4" />,
  "C#": <SiDotnet className="lg:w-6 lg:h-6 w-4 h-4" />,
  Unity: <SiUnity className="lg:w-6 lg:h-6 w-4 h-4" />,
  PlasticCSM: <FaReact className="lg:w-6 lg:h-6 w-4 h-4" />,
  GraphQL: <SiGraphql className="lg:w-6 lg:h-6 w-4 h-4" />,
  JSON: <SiJson className="lg:w-6 lg:h-6 w-4 h-4" />,
};

export const TimelineItem: FC<TimelineItemProps> = (props) => {
  const {
    output,
    role,
    status,
    title,
    usedTechs,
    desc,
    githubLink,
    images,
    link,
  } = props;

  const PingWrapper: FC = () => {
    switch (status) {
      case "ongoing":
        return <Ping isAnimated mode="warning" size="sm" className="mr-2" />;
      case "done":
        return <Ping mode="success" size="sm" className="mr-2" />;
      case "paused":
        return <Ping mode="warning" size="sm" className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="tracking-tight">
      <Badge variant={"outline"} className="px-2 py-1 ">
        <PingWrapper />
        <span className="capitalize">{status}</span>
      </Badge>
      <h2
        className={`text-2xl h-auto truncate lg:text-4xl mb-4 font-bold tracking-tight pt-4 lg:mt-0 -mt-3 ${geistMono.className}`}
      >
        {title}
      </h2>
      <h4 className="text-neutral-800 dark:text-neutral-400 text-sm md:text-sm lg:text-base  -mt-4">
        My Role: <span className="">{role}</span>
      </h4>
      <Marquee className="w-full lg:w-[27rem] py-4">
        {usedTechs.map((tech, idx) => {
          if (!techIconMap[tech]) return null;
          else
            return (
              <div key={idx} className="lg:w-5 lg:h-5 h-3 w-3">
                {techIconMap[tech]}
              </div>
            );
        })}
      </Marquee>
      <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm lg:text-base font-normal lg:pt-3 pt-2">
        {desc}
      </p>
      <div className="flex items-center justify-center lg:gap-2 gap-1 flex-row-reverse lg:pb-8 pb-6 lg:pt-4 pt-2 w-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"} className="h-auto lg:block hidden py-3">
              <Lightbulb className="w-8 h-8" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-neutral-900 dark:text-white">
            <AlertDialogHeader className="dark:bg-neutral-900 dark:text-white">
              <AlertDialogTitle>Outcome of the project</AlertDialogTitle>
              <AlertDialogDescription>{output}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end mt-4">
              <AlertDialogCancel asChild>
                <Button variant="ghost" className="dark:text-white">
                  Close
                </Button>
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="w-1/2 h-auto"
          variant={"outline"}
          disabled={!githubLink}
        >
          <Link
            href={githubLink ?? ""}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full h-full items-center justify-center flex flex-row gap-2"
          >
            <FaGithub className="w-6 h-6 lg:w-8 lg:h-8" />
            <span className="text-xs lg:text-base">Github</span>
          </Link>
        </Button>
        <Button className="w-1/2 h-auto" disabled={!link}>
          <Link
            href={link ?? ""}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full h-full items-center justify-center flex flex-row gap-2"
          >
            <span className="text-xs lg:text-base">Visit</span>
            <FiArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images?.length > 0 &&
          images.map((val, idx) => (
            <ZoomableImage
              alt={`Burak Bilen - ${val.split("/")[2]} Project`}
              key={idx}
              src={val}
              height={600}
              width={1000}
              className="rounded-lg h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          ))}
      </div>
    </div>
  );
};
