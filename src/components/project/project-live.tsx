import { useIsMobile } from "@/hooks/use-mobile";
import { getImagePlaceholder } from "@/lib/getImagePlaceholder";
import MotionContainer from "@/motion/motion-container";
import { ArrowUpRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ProjectLiveProps = {
  plainLink: string;
  placeholder: string;
};

export const ProjectLive: FC<ProjectLiveProps> = ({
  placeholder,
  plainLink,
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const placeholderImg = useMemo(
    () => getImagePlaceholder(placeholder),
    [placeholder],
  );

  const handlePreconnect = useCallback(() => {
    if (typeof document === "undefined") return;

    try {
      const origin = new URL(plainLink, window.location.href).origin;

      if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`))
        return;

      const pre = document.createElement("link");
      pre.rel = "preconnect";
      pre.href = origin;
      pre.crossOrigin = "anonymous";
      document.head.appendChild(pre);

      const dns = document.createElement("link");
      dns.rel = "dns-prefetch";
      dns.href = origin;
      document.head.appendChild(dns);
    } catch (err) {
      console.debug(`Error preconnecting: ${err}`);
    }
  }, [plainLink]);

  const handleOpen = () => setOpen(true);

  if (open) {
    return (
      <iframe
        src={plainLink}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        loading="lazy"
        title="live"
        className="size-full absolute object-cover top-0 left-0 rounded-2xl shadow-md"
      >
        <span className="sr-only">Live demo</span>
      </iframe>
    );
  }

  return (
    <Card className="size-full relative bg-transparent overflow-hidden">
      <MotionContainer
        animation={{
          mode: "fadeIn",
          transition: "gentle",
          duration: 1,
          delay: 0.5,
        }}
        elementType="div"
        className="absolute object-cover rounded-2xl shadow-md inset-0 -z-10"
        controller={{
          configView: {
            amount: 0.5,
            once: false,
          },
        }}
      >
        {placeholderImg && (
          <Image
            src={placeholderImg}
            fill
            alt="live"
            className="size-full rounded-2xl object-cover blur-xl"
          />
        )}
        <div className="absolute object-cover  w-full h-full bg-linear-to-b from-black to-black/40" />
      </MotionContainer>
      <CardHeader className="text-start bg-transparent pointer-events-none select-none">
        <CardTitle className="tracking-tight text-white">
          View the project {!isMobile && "interactively"}
        </CardTitle>
        <CardDescription className="text-xs dark:text-muted-foreground text-muted md:pt-1">
          The <b>interactive</b> and <b>mobile version</b> of the selected
          project that you can play with.
        </CardDescription>
        <CardAction className="pointer-events-auto">
          <Link href={plainLink} target="_blank">
            <Button size="sm" variant="outline">
              Or view live <ArrowUpRight />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="text-center my-[25%] items-center-safe grid place-items-center gap-2 ">
        <Button
          onPointerEnter={handlePreconnect}
          onMouseEnter={handlePreconnect}
          onTouchStart={handlePreconnect}
          onFocus={handlePreconnect}
          size="lg"
          variant="destructive"
          className="md:mt-0 -mt-28"
          onClick={handleOpen}
        >
          <Eye /> View the project
        </Button>
        <p className="text-xs md:max-w-xs max-w-2xs md:bottom-12 bottom-8 absolute tracking-tighter">
          *Consider that the project may not reflect it's actual performance.
        </p>
      </CardContent>
    </Card>
  );
};
