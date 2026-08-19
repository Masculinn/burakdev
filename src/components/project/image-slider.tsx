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

  const handleSlideTo = (idx: number) => {
    if (!api) return;
    api.scrollTo(idx);
  };

  return (
    <Carousel setApi={setApi} className="relative">
      <CarouselContent className="snap-x snap-mandatory size-full">
        {images.map((img, idx) => (
          <CarouselItem
            key={idx}
            className="snap-center max-h-max h-auto md:my-auto"
          >
            <AspectRatio
              ratio={1 / 1}
              className="relative md:my-0 my-8 rounded-md"
            >
              <LqipImage
                loading="lazy"
                alt={getImgAlt(img)}
                src={img}
                fill
                className="absolute object-cover rounded-md"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
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
