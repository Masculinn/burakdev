import timelineConfig from "@/constants/timeline.config";
import type { ProjectStatus, TimelineContentItem } from "@/interfaces";
import getIcon from "@/lib/getIcon";
import { getAnimation } from "@/lib/motion/getAnimation";
import { cn } from "@/lib/utils";
import { MotionContainer } from "@/motion/components/motion-container";
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
          // biome-ignore lint/suspicious/noArrayIndexKey: static data
          key={idx}
          className="flex justify-start pt-10 md:pt-40 md:gap-10 w-full"
        >
          <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
              <div className="size-4 rounded-full bg-muted border-2 border-border p-2" />
            </div>
            <h3 className="hidden md:block pl-20 text-5xl text-muted-foreground tracking-tighter">
              {item.title}
            </h3>
          </div>
          <div className="relative pl-20 pr-4 md:pl-4 w-full">
            <h3 className="md:hidden block text-3xl lg:mb-4 mb-6 text-left text-muted-foreground">
              {item.title}
            </h3>
            <TimelineItem {...item.content} id={idx} />
          </div>
        </div>
      ))}
      <div className="h-full absolute md:left-8 left-8 top-12 overflow-hidden w-px bg-linear-to-b bg-clip-border from-rose-500/50  to-blue-500 via-purple-500 mb-24" />
    </div>
  );
};

const animation = getAnimation("timelineItem");

const TimelineItem: FC<TimelineContentItem> = ({
  status,
  title,
  techs,
  images,
  desc,
  gitLink,
  id,
}) => {
  return (
    <MotionContainer
      {...animation}
      animation={{
        ...animation.animation,
        mode: [id % 2 === 0 ? "fadeRight" : "fadeLeft", "filterBlurIn"],
      }}
      className="tracking-tight"
    >
      <Badge variant="outline" className="px-2 py-1">
        <PingWrapper status={status} />
        <span className="capitalize">{status}</span>
      </Badge>
      <h2 className="text-2xl h-auto truncate md:text-4xl mb-4 font-bold tracking-tight lg:mt-0 font-secondary">
        {title}
      </h2>
      <Marquee className="w-full md:w-108 py-2">
        {techs.map((tech) => {
          const Icon = getIcon(tech.toLowerCase());
          return (
            <Icon
              className="md:size-5 size-4"
              fill="currentColor"
              stroke="none"
              key={tech}
            />
          );
        })}
      </Marquee>
      <p className="text-muted-foreground dark:text-neutral-200 text-xs md:text-sm lg:text-base font-normal lg:pt-3 pt-2">
        {desc}
      </p>
      <div className="flex items-center justify-center lg:pb-8 pb-6 lg:pt-4 pt-2 w-full">
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          disabled={!gitLink}
          nativeButton={false}
          render={
            <Link
              aria-disabled={!gitLink}
              href={gitLink ?? ""}
              rel="noopener noreferrer"
              target="_blank"
            />
          }
        >
          <Github className="w-6 h-6 lg:w-8 lg:h-8" />
          <span className="text-xs lg:text-base">Github</span>
        </Button>
      </div>
      {images && <Project {...{ images, desc, title }} />}
    </MotionContainer>
  );
};

function PingWrapper({ status }: { status: ProjectStatus }) {
  switch (status) {
    case "ongoing":
      return <Ping isAnimated mode="primary" size="sm" className="mr-0.5" />;
    case "done":
      return <Ping mode="success" size="sm" className="mr-0.5" />;
    case "paused":
      return <Ping mode="destructive" size="sm" className="mr-0.5" />;
    default:
      return null;
  }
}

export default Timeline;
