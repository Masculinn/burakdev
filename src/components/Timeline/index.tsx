import { TimelineEntryProps } from "@/interfaces";
import { useScroll, useTransform, motion } from "motion/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { TimelineItem } from "./TimelineItem";
import MotionContainer from "../MotionProvider/motion-container";

export const Timeline: FC<{ data: TimelineEntryProps[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-transparent " ref={containerRef}>
      <div className="max-w-7xl mx-auto lg:pt-16 pt-12 ">
        <h2 className="text-2xl lg:text-4xl mb-4 text-black font-bold dark:text-white tracking-tight">
          Timeline Of My Journey
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Here is my carreer timeline as a software developer for the past 5
          years.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto ">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl lg:mb-4 mb-6 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              <MotionContainer
                elementType="article"
                transition="smooth"
                mode={
                  idx % 2 === 0
                    ? ["fadeRight", "filterBlurIn"]
                    : ["fadeLeft", "filterBlurIn"]
                }
                configView={{ once: false, amount: 0.5 }}
                duration={0.5}
              >
                <TimelineItem {...item.content} />
              </MotionContainer>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]  from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px]  rounded-full "
          />
        </div>
      </div>
    </div>
  );
};
