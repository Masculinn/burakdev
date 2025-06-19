import { RadarItem, ReduxThemeProps } from "@/interfaces";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import CodeProvider from "../../code-provider";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { ScrollArea } from "@/components/ui/scroll-area";
import MotionContainer from "@/components/MotionProvider/motion-container";

const RenderRadar: FC<RadarItem> = (props) => {
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );

  const { id, render, desc, lang, title } = props;

  const text = desc.split(/\s+/);

  return (
    <ScrollArea className="mb-4 max-w-96 mx-auto h-80  w-full" type="always">
      <MotionContainer
        key={id + 1}
        delay={1}
        mode={["filterBlurIn", "fadeRight"]}
        configView={{ once: true, amount: 0.5 }}
        elementType={"div"}
        duration={1}
        transition="smooth"
      >
        <h2 className="text-2xl font-bold tracking-tighter self-start text-start flex my-2">
          {title}
        </h2>
      </MotionContainer>
      <div className="flex flex-wrap gap-1 tracking-tighter  leading-4 font-bold text-sm my-4">
        <MotionQueue
          key={id}
          elementType={"span"}
          animations={
            Array.from({ length: text.length }).fill({
              mode: ["filterBlurIn", "fadeRight"],
              duration: 0.88,
              configView: { once: false, amount: 0.5 },
            }) as AnimationQueueAnimationProps[]
          }
          isDynamicallyQueued
          children={text}
          delayLogic="linear"
          duration={0.22}
        />
      </div>
      <span>
        <CodeProvider
          code={render}
          appTheme={appTheme === "dark" ? "light" : "dark"}
          bordered
          wrapperStyle="min-w-96 max-w-80 mx-auto w-full "
          reverseTheme
          desc={lang}
          lang={lang}
          fontSize={"sm"}
        />
      </span>
    </ScrollArea>
  );
};

export default RenderRadar;
