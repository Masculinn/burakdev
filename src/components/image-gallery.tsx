import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { getImagePlaceholder } from "@/lib/getImagePlaceholder";
import { cn } from "@/lib/utils";
import MotionContainer from "@/motion/motion-container";
import MotionText from "@/motion/motion-text";
import { ArrowUpRight, Expand, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { LqipImage } from "./lqip-image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

type ImageGalleryProps = {
  images: string[];
  desc: string;
  title: string;
  role: string;
  plainLink?: string;
};

type ImagePreviewProps = {
  img: string;
  onSelect: (img: string) => void;
  triggerMode: "drawer" | "dialog";
};

type SliderProps = {
  selected: string;
  images: string[];
  plainLink?: string;
};

export const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const isMobile = useIsMobile();

  const { images, title, desc, role, plainLink } = props;

  const [selected, setSelected] = useState<string>(images[0]);
  const handleSelected = useCallback((img: string) => setSelected(img), []);

  if (isMobile)
    return (
      <div className="grid grid-cols-2 gap-2">
        <Drawer>
          {images.map((val) => (
            <ImagePreview
              img={val}
              key={val}
              onSelect={handleSelected}
              triggerMode="drawer"
            />
          ))}
          <DrawerContent>
            <DrawerHeader>
              <Badge variant={"outline"}>My role: {role}</Badge>
              <DrawerTitle className="text-xl font-secondary tracking-tighter">
                <ProjectTitle title={title} />
              </DrawerTitle>
              <DrawerDescription className="text-start tracking-tighter text-xs">
                {desc}
              </DrawerDescription>
              <Slider
                images={images}
                selected={selected}
                plainLink={plainLink}
              />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      <Dialog modal>
        {images.map((val) => (
          <ImagePreview
            img={val}
            key={val}
            onSelect={handleSelected}
            triggerMode="dialog"
          />
        ))}
        <DialogContent>
          <DialogHeader>
            <Badge variant={"outline"}>My role: {role}</Badge>
            <DialogTitle className="text-xl font-secondary tracking-tighter text-muted-foreground">
              <ProjectTitle title={title} />
            </DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          <Slider selected={selected} images={images} plainLink={plainLink} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ImagePreview: FC<ImagePreviewProps> = ({
  img,
  onSelect,
  triggerMode,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleClick = useCallback(() => onSelect(img), [img, onSelect]);

  const Trigger = triggerMode === "dialog" ? DialogTrigger : DrawerTrigger;

  return (
    <Trigger onClick={handleClick}>
      <MotionContainer
        animation={{
          mode: "microWobble",
          transition: "gentle",
          duration: 1,
        }}
        elementType="div"
        className="relative hover:z-50 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(false)}
        controller={{
          trigger: !isHovered,
        }}
      >
        <AspectRatio
          ratio={1 / 1}
          className="rounded-md outline-muted outline-1 relative overflow-hidden"
        >
          <MotionContainer
            animation={{
              mode: ["clipPop", "fadeIn"],
              transition: "smoothFast",
              duration: 2,
            }}
            elementType="div"
            controller={{
              trigger: isHovered,
            }}
            className="object-cover text-white size-full z-20 absolute top-0 left-0 bg-black/25 grid place-items-center-safe rounded-lg backdrop-blur-md"
          >
            <MotionContainer
              animation={{
                mode: "scaleZoomIn",
                transition: "gentle",
                duration: 0.88,
              }}
              controller={{
                trigger: isHovered,
              }}
              elementType="div"
            >
              <Expand className="md:size-10 size-7" />
            </MotionContainer>
            <span className="sr-only">Zoom in</span>
          </MotionContainer>
          <LqipImage
            loading="lazy"
            alt={getImgAltName(img)}
            src={img}
            method="base64"
            fill
            className="object-cover rounded-lg z-0"
          />
        </AspectRatio>
      </MotionContainer>
    </Trigger>
  );
};

const Slider = ({ selected, images, plainLink }: SliderProps) => {
  const [current, setCurrent] = useState<number>(images.indexOf(selected));
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    const handleSelect = () => setCurrent(api.selectedScrollSnap());

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(images.indexOf(selected));
  }, [selected, images, api]);

  const handleSlideTo = useCallback(
    (idx: number) => {
      if (!api) return;

      api.scrollTo(idx);
    },
    [api],
  );

  const items = useMemo(() => {
    const arrayLength = plainLink ? images.length + 1 : images.length;

    return Array.from({ length: arrayLength }).map((_, idx) => {
      return (
        <CarouselItem
          key={idx}
          className="snap-center max-h-max h-auto md:my-auto"
        >
          <AspectRatio
            ratio={1 / 1}
            className="relative md:my-0 my-8 rounded-md"
          >
            {idx >= images.length && plainLink ? (
              <ProjectLive plainLink={plainLink} placeholder={images[0]} />
            ) : (
              <LqipImage
                loading="lazy"
                alt={getImgAltName(images[idx])}
                src={images[idx]}
                method="base64"
                fill
                className="absolute object-cover rounded-md"
              />
            )}
          </AspectRatio>
        </CarouselItem>
      );
    });
  }, [images, plainLink]);

  return (
    <Carousel setApi={setApi} className="relative">
      <CarouselContent className="snap-x snap-mandatory size-full">
        {items}
      </CarouselContent>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {Array.from({ length: count }).map((_, idx) => (
          <button
            className={cn(
              "cursor-pointer w-2.5 h-1.5 dark:bg-white/10 shadow-2xs bg-slate-600/20 backdrop-blur-sm border-[0.5px] rounded-full",
              idx === current &&
                "dark:bg-muted bg-muted-foreground w-5 transition-all",
            )}
            key={idx}
            onClick={() => handleSlideTo(idx)}
            type="button"
          />
        ))}
      </div>
    </Carousel>
  );
};

function getImgAltName(img: string) {
  if (!img) return "image";
  return img.split("/")[img.split("/").length - 1].split(".")[0];
}

function ProjectTitle({ title }: { title: string }) {
  return (
    <MotionText
      elementType="span"
      animation={{
        mode: ["textShimmer", "transformRevealRight"],
        transition: "gentle",
        delay: 0.15,
        duration: 0.8,
      }}
      config={{
        mode: "chars",
        duration: 0.05,
        delayLogic: "linear",
      }}
    >
      {title}
    </MotionText>
  );
}

const ProjectLive = ({
  plainLink,
  placeholder,
}: {
  plainLink: string;
  placeholder: string;
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const placeholderImg = useMemo(
    () => getImagePlaceholder(placeholder, "base64"),
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
      <CardContent className="text-center my-[25%] items-center-safe grid place-items-center gap-2">
        <Button
          onPointerEnter={handlePreconnect}
          onMouseEnter={handlePreconnect}
          onTouchStart={handlePreconnect}
          onFocus={handlePreconnect}
          size="lg"
          variant={"destructive"}
          className="md:mt-0 -mt-8"
          onClick={() => setOpen(true)}
        >
          <Eye /> View the project
        </Button>
        <p className="text-xs dark:text-muted text-muted md:max-w-xs max-w-2xs md:bottom-12 bottom-8 absolute tracking-tighter">
          *Consider that the project may not reflect it's actual performance.
        </p>
      </CardContent>
    </Card>
  );
};
