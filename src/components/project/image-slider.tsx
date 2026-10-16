import { cn } from "@/lib/utils";
import { getImgAlt } from "@/utils/getImgAlt";
import { useEffect, useState, type FC } from "react";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";

type SliderProps = {
  selected: string;
  images: string[];
};

export const Slider: FC<SliderProps> = ({ images, selected }) => {
  const selectedIndex: number = Math.max(0, images.indexOf(selected));

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(selectedIndex);
  const [count, setCount] = useState<number>(images.length);

  useEffect(() => {
    if (!api) return;

    const sync = (): void => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    sync();
    api.on("select", sync);
    api.on("reInit", sync);

    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    if (api.selectedScrollSnap() === selectedIndex) return;

    api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  const handleSlideTo = (idx: number): void => {
    api?.scrollTo(idx);
  };

  return (
    <Carousel
      setApi={setApi}
      opts={{ startIndex: selectedIndex, align: "center" }}
      className="relative"
      data-base-ui-swipe-ignore=""
    >
      <CarouselContent className="touch-pan-y touch-pinch-zoom select-none">
        {images.map((img) => (
          <CarouselItem key={img} className="h-auto max-h-max md:my-auto">
            <AspectRatio
              ratio={1 / 1}
              className="relative md:my-0 my-8 rounded-md"
            >
              <LqipImage
                alt={getImgAlt(img)}
                src={img}
                fill
                draggable={false}
                className="absolute object-cover rounded-md pointer-events-none [-webkit-touch-callout:none]"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
        role="tablist"
        aria-label="Slide navigation"
      >
        {Array.from({ length: count }).map((_, idx) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: static data
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === current}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => handleSlideTo(idx)}
            className={cn(
              "cursor-pointer w-2.5 h-1.5 dark:bg-white/10 shadow-2xs bg-slate-600/20 backdrop-blur-sm border-[0.5px] rounded-full transition-all",
              idx === current && "dark:bg-muted bg-muted-foreground w-5",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
};
