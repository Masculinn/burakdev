import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MotionCarouselProps } from "@/interfaces";
import { FC, memo, useEffect, useState } from "react";
import { CodeBadge } from "../../code-badge";
import MotionImage from "@/components/MotionProvider/motion-image";

const MotionCarousel: FC<MotionCarouselProps> = (props) => {
  const { data, controlConfig, fallback } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!data) {
    console.warn("No Data Provided on MotionCarousel Component!");
    return null;
  }

  return (
    <div className="max-w-lg mx-auto">
      <Carousel setApi={setApi} className="w-full  lg:w-full">
        <CarouselContent>
          {data.map((val, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center relative">
                  <CodeBadge code={val.badge} />
                  <MotionImage
                    key={index}
                    isDynamicallyQueued
                    animationDuration={val.animationDuration ?? 1}
                    delayLogic={val.delayLogic ?? "sinusoidal"}
                    configView={{ once: false, amount: "some" }}
                    motionFn={val.mode}
                    transition={val.transition}
                    imageUrl={val.url}
                    controlConfig={controlConfig}
                    fallback={fallback}
                    pieces={144}
                    wrapperClassName="w-full h-full absolute z-50 top-0 left-0"
                    animations={val.animation}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default memo(MotionCarousel);
