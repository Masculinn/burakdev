import { cn, getImgAltName } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import { ProjectLive } from "./project-live";

type SliderProps = {
  selected: string;
  images: string[];
  plainLink?: string;
};

export const Slider: FC<SliderProps> = ({ images, selected, plainLink }) => {
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
    [api]
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
                "dark:bg-muted bg-muted-foreground w-5 transition-all"
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
