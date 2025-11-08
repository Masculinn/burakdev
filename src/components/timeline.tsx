import timelineConfig from "@/constants/timeline.config";
import type { ProjectStatus, TimelineContentItem } from "@/interfaces";
import getIcon from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import MotionContainer from "@/motion/motion-container";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Github } from "./icons/svg-icons";
import Marquee from "./marquee";
import Ping from "./ping";
import Project from "./project";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Timeline = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      {timelineConfig.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-start pt-10 md:pt-40 md:gap-10 w-full"
        >
          <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-neutral-600 dark:bg-neutral-800 border-2 border-neutral-500 dark:border-neutral-700 p-2" />
            </div>
            <h3 className="hidden md:block pl-20 text-5xl text-muted-foreground tracking-tighter">
              {item.title}
            </h3>
          </div>
          <div className="relative pl-20 pr-4 md:pl-4 w-full">
            <h3 className="md:hidden block text-3xl lg:mb-4 mb-6 text-left text-muted-foreground">
              {item.title}
            </h3>
            <MotionContainer
              elementType="article"
              animation={{
                mode: [
                  idx % 2 === 0 ? "fadeRight" : "fadeLeft",
                  "filterBlurIn",
                ],
                transition: "gentle",
                duration: 1,
                delay: 0.25,
              }}
              controller={{
                configView: {
                  once: false,
                  amount: 0.5,
                },
              }}
            >
              <TimelineItem {...item.content} />
            </MotionContainer>
          </div>
        </div>
      ))}
      <div className="h-full absolute md:left-8 left-8 top-12 overflow-hidden w-px bg-linear-to-b bg-clip-border from-rose-500/50  to-blue-500 via-purple-500 mb-24" />
    </div>
  );
};

const TimelineItem: FC<TimelineContentItem> = ({
  status,
  title,
  role,
  techs,
  images,
  desc,
  plainLink,
  gitLink,
}) => {
  return (
    <div className="tracking-tight">
      <Badge variant={"outline"} className="px-2 py-1 ">
        <PingWrapper status={status} />
        <span className="capitalize">{status}</span>
      </Badge>
      <h2 className="text-2xl h-auto truncate lg:text-4xl mb-4 font-bold tracking-tight pt-4 lg:mt-0 -mt-3 font-secondary">
        {title}
      </h2>
      <p className="text-neutral-800 dark:text-neutral-400 text-sm md:text-sm lg:text-base -mt-4">
        My Role: <span className="">{role}</span>
      </p>
      <Marquee className="w-full md:w-108 py-4">
        {techs.map((tech, idx) => {
          const Icon = getIcon(tech.toLowerCase());
          return (
            <Icon
              className="md:size-5 size-4"
              fill="currentColor"
              stroke="none"
              key={idx}
            />
          );
        })}
      </Marquee>
      <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm lg:text-base font-normal lg:pt-3 pt-2">
        {desc}
      </p>
      <div className="flex items-center justify-center lg:gap-2 gap-1 flex-row-reverse lg:pb-8 pb-6 lg:pt-4 pt-2 w-full">
        <Button
          className="w-1/2 h-auto"
          variant={"outline"}
          disabled={!gitLink}
        >
          <Link
            aria-disabled={!gitLink}
            href={gitLink ?? ""}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full h-full items-center justify-center flex flex-row gap-2"
          >
            <Github className="w-6 h-6 lg:w-8 lg:h-8" />
            <span className="text-xs lg:text-base">Github</span>
          </Link>
        </Button>
        <Button className="w-1/2 h-auto" disabled={!plainLink}>
          <Link
            href={plainLink ?? ""}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full h-full items-center justify-center flex flex-row gap-2"
          >
            <span className="text-xs lg:text-base">Visit</span>
            <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8" />
          </Link>
        </Button>
      </div>
      {images && <Project {...{ images, desc, role, title, plainLink }} />}
    </div>
  );
};

function PingWrapper({ status }: { status: ProjectStatus }) {
  switch (status) {
    case "ongoing":
      return <Ping isAnimated mode="warning" size="sm" className="mr-2" />;
    case "done":
      return <Ping mode="success" size="sm" className="mr-2" />;
    case "paused":
      return <Ping mode="error" size="sm" className="mr-2" />;
    default:
      return null;
  }
}

export default Timeline;
