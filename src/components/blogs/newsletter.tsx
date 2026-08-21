import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MotionImage } from "@/motion/components/motion-image";
import { MotionText } from "@/motion/components/motion-text";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { Badge } from "../ui/badge";
import Subscribe from "./subscribe";

function NewsletterComponent({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "w-full h-auto md:h-88 overflow-hidden relative rounded-xl flex md:flex-row flex-col-reverse md:mb-0 mb-4",
        className,
      )}
    >
      <MotionImage
        animation={{
          mode: [
            "rotateRoll",
            "scaleZoomIn",
            "rotateFlipY",
            !isMobile ? "opacity" : "flash",
          ],
          transition: "cubicElastic",
          duration: isMobile ? 3 : 1,
          delay: 0,
        }}
        config={{
          duration: isMobile ? 2 : 1.2,
          img: "/assets/newsletter.svg",
          delayLogic: isMobile ? "jitter" : "pendulum",
          fn: !isMobile ? "hover" : undefined,
          pieces: isMobile ? 49 : 81,
        }}
        wrapperClassName="md:h-full md:w-2/5 w-full h-44 overflow-hidden md:rounded-none rounded-xl"
      />
      <div className="md:h-full md:w-3/5 w-full h-3/5 relative bg-transparent text-center items-start md:items-start flex flex-col md:justify-center justify-end md:px-16 md:my-0 gap-4">
        <Badge variant="outline" className="text-xs">
          <Mail />
          Subscribe Newsletter
        </Badge>
        <div className="inline-flex">
          <CardHeader />
          <Subscribe isIcon />
        </div>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <MotionText
      animation={{
        mode: ["filterBlurIn", "fadeUp"],
        transition: "gentle",
        delay: 0.5,
        duration: 1,
      }}
      config={{
        duration: 0.5,
        mode: "words",
        delayLogic: "cosine",
      }}
      controller={{
        configView: {
          once: false,
          amount: 0.25,
        },
      }}
      elementType="h2"
      className="text-center"
      wrapperClassName="md:text-3xl text-xl tracking-tighter max-w-sm text-center text-shadow-2xs text-4xl md:text-5xl"
    >
      No fluff. No tutorials. No ads. No AI made bull$hit.
    </MotionText>
  );
}

const Newsletter = dynamic(
  () =>
    Promise.resolve({
      default: NewsletterComponent,
    }),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="w-full h-60 md:h-88 my-8 overflow-hidden rounded-l-none border-l-0 relative " />
    ),
  },
);

export default Newsletter;
