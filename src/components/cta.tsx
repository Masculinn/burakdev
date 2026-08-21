import { useIsMobile } from "@/hooks/use-mobile";
import { iconsMap } from "@/lib/getIcon";
import { getAnimation } from "@/lib/motion/getAnimation";
import { cn } from "@/lib/utils";
import { MotionContainer } from "@/motion/components/motion-container";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Marquee from "./marquee";
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";

const { elementType, animation, className } = getAnimation("cta");

export default function Cta() {
  const [trigger, setTrigger] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleTrigger = () => setTrigger(true);
  const handleReset = () => setTrigger(false);

  return (
    <section className="w-full h-max z-50 backdrop-blur-sm relative ">
      <Item
        variant="outline"
        className="flex-col md:flex-row overflow-hidden relative"
      >
        <MotionContainer
          animation={{
            ...animation,
            mode: trigger ? "typingEffect" : animation.mode,
          }}
          elementType={elementType}
          className={cn(className, trigger ? " to-rose-500/10" : "to-blue-500")}
        />
        <ItemContent>
          <ItemTitle className="text-2xl tracking-tighter">
            <BookOpen /> Continue with the articles
          </ItemTitle>
          <ItemDescription className="tracking-tight max-w-2xl ">
            Covering the web: no stale material — all fresh, cutting-edge in
            newflanged ways. Curated for community, by creators.
          </ItemDescription>
        </ItemContent>
        <ItemActions className="md:w-auto w-full z-50">
          <Link href="/blogs">
            <Button
              variant="outline"
              size="sm"
              className="md:w-auto w-full"
              onMouseEnter={handleTrigger}
              onMouseLeave={handleReset}
            >
              Start reading
              <ArrowRight />
            </Button>
          </Link>
        </ItemActions>
      </Item>
      {!isMobile && <VerticalMarquee />}
    </section>
  );
}

const techs = Object.entries(iconsMap).map(([key]) => key);
const [firstPart, secondPart] = techs.reduce(
  (acc, tech, index) => {
    index % 2 === 0 ? acc[0].push(tech) : acc[1].push(tech);
    return acc;
  },
  [[], []] as string[][],
);

function VerticalMarquee() {
  return (
    <div className="absolute translate-x-1/2 top-1/2 -translate-y-1/2 left-3/5 text-background select-none pointer-events-none flex flex-row gap-12 h-full font-secondary text-xs">
      <Marquee vertical className="-ml-24 overflow-hidden my-2">
        {firstPart.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </Marquee>
      <Marquee vertical className="-ml-8 overflow-hidden my-2" reverse>
        {secondPart.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </Marquee>
    </div>
  );
}
