import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimationKeys,
  AnimationQueueAnimationProps,
  MotionEngineProps,
  TransitionKeys,
  ViewAnimationControllerProps,
} from "./types";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { SelectGroup } from "@radix-ui/react-select";
import animations from "./lib/animate.lib";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { VscDebugRestart } from "react-icons/vsc";
import { Check, Copy, Expand, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import transitions from "./lib/transitions.lib";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Card } from "../ui/card";
import copyCode from "@/utils/copyCode";
import CodeProvider from "../Documentation/code-provider";
import { ScrollArea } from "../ui/scroll-area";
import _ from "lodash";
import { useIsMobile } from "@/hooks/use-mobile";
import MotionContainer from "./motion-container";
import MotionQueue from "./motion-queue";

const DEFAULT_ANIMATION = [
  "filterBlurIn",
  "fadeRight",
  "burakHeartbeat",
] as AnimationKeys[];

export default function MotionEngine(props: ViewAnimationControllerProps) {
  const { children, configView, className, elementType = "div" } = props;
  const [config, setConfig] = useState<MotionEngineProps>({
    delay: 0,
    duration: 0.5,
    reverse: false,
    isAnimationStopped: false,
  });
  const [animation, setAnimation] =
    useState<AnimationKeys[]>(DEFAULT_ANIMATION);
  const [transition, setTransition] = useState<TransitionKeys>("smooth");
  const [triggerController, setTriggerController] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [key, setKey] = useState(0);
  const [tab, setTab] = useState<string | null>(null);

  const isMobile = useIsMobile();
  useEffect(() => {
    setTab("MotionContainer");
  }, []);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [
    config.duration,
    triggerController,
    config.delay,
    config.reverse,
    transition,
    animation,
    tab,
  ]);

  const finalCode = useMemo(() => {
    switch (tab) {
      case "MotionContainer":
        const code = `<MotionContainer
  elementType=${JSON.stringify(elementType)}
  mode={${JSON.stringify(animation)}}
  transition=${JSON.stringify(transition)}
  duration={${config.duration}}
  children={"Hello There!"}
/>`;
        return code;
      case "MotionQueue":
        const queueCode = `const animations = Array.from({ length: 6 }).fill({
  mode: ${JSON.stringify(animation)},
  duration: ${config.duration},
  reverse: ${config.reverse},
  delay: ${config.delay},
  transition: ${JSON.stringify(transition)},
} as AnimationQueueAnimationProps);

<MotionQueue
  duration={${config.duration}}
  elementType={"${elementType}"}
  children={MY_REACT_NODES}
  animations={animations as AnimationQueueAnimationProps[]}
  isDynamicallyQueued
/>`;
        return queueCode;
      default:
        return `<MotionContainer
        delay={${config.delay}}
        duration={${config.duration}}
        reverse={${config.reverse}}
        transition={${transition}}
        mode={${JSON.stringify(animation)}}
        isAnimationStopped={${config.isAnimationStopped}}
        isControlled={{ trigger: ${triggerController} }}
        elementType={${JSON.stringify(elementType)}}
        configView={${JSON.stringify(configView)}}
        children="Hello There!"
      />
`;
    }
  }, [key]);

  const handleCopy = useCallback(() => {
    copyCode(finalCode).then(() => setIsCopied(true));
    const timeoutId = setTimeout(() => setIsCopied(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [finalCode]);

  const renderContainer = useCallback(() => {
    switch (tab) {
      case "MotionContainer":
        return (
          <MotionContainer
            key={key}
            delay={config.delay}
            duration={config.duration}
            isAnimationStopped={config.isAnimationStopped}
            reverse={config.reverse}
            children={children}
            configView={configView}
            mode={animation}
            className="z-50 overflow-y-scroll h-full flex flex-col gap-4 items-center justify-center"
            isControlled={{ trigger: triggerController }}
            elementType={elementType}
            transition={transition}
          />
        );
      case "MotionQueue":
        return (
          <div className="relative overflow-y-scroll h-[350px] w-full items-center justify-center flex flex-col">
            <MotionQueue
              {...config}
              duration={config.duration}
              key={key}
              elementType={elementType}
              children={Array.from({ length: 6 })
                .fill(children)
                .map((_, index) => (
                  <div key={`${index}-queue__element`}>{children}</div>
                ))}
              animations={
                Array.from({ length: 6 }).fill({
                  mode: animation,
                  duration: config.duration,
                  configView: configView,
                  reverse: config.reverse,
                  delay: config.delay,
                  transition: transition,
                  isControlled: { trigger: triggerController },
                }) as AnimationQueueAnimationProps[]
              }
              className="text-center"
              isDynamicallyQueued
            />
          </div>
        );
      default:
        return null;
    }
  }, [key]);

  const renderReset = useCallback(() => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="absolute top-2 right-4 z-50"
            onClick={handleReset}
          >
            <MotionContainer
              delay={0}
              duration={config.duration}
              key={key}
              children={
                <VscDebugRestart
                  className={`w-8 h-8 cursor-pointer rounded-full m-2 p-2 bg-black/50`}
                />
              }
              configView={{
                once: false,
                amount: 0.5,
              }}
              className=" rounded-xl "
              mode={["spin"]}
              elementType="div"
              transition={transition}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Trigger Animation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }, [triggerController]);

  const renderCopy = useCallback(() => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="absolute top-2 right-14 z-50"
            onClick={handleCopy}
          >
            <MotionContainer
              configView={{ once: false, amount: 0.5 }}
              mode={["fadeIn", "filterBlurIn"]}
              className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 bg-black/50"
              isControlled={{ trigger: !isCopied }}
              delay={0.5}
              elementType={"div"}
              transition="smooth"
            >
              {!isCopied ? (
                <Copy className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </MotionContainer>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy Code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }, [isCopied]);

  const handleReset = () => {
    setTriggerController(false);
    setTimeout(() => setTriggerController(true), config.duration);
  };

  const handleAddAnimation = (e: string) =>
    setAnimation((prev) => [...prev, e] as any);

  const handleRemoveAnimation = (e: string) =>
    setAnimation((prev) => prev.filter((item) => item !== e));

  const handleChangeTransition = (e: TransitionKeys) => setTransition(e);

  const handleAnimationTypeChange = (e: string) => setTab(e);
  return (
    <>
      <div className=" lg:h-auto bg-cover h-64 w-full border rounded-lg my-4 relative items-center justify-center flex lg:flex-row flex-col gap-4 text-white">
        <ResizablePanelGroup
          direction={!isMobile ? "horizontal" : "vertical"}
          className=" w-full rounded-lg "
        >
          <ResizablePanel defaultSize={50}>
            <div
              className={`${cn(
                className,
                "relative h-full w-full backdrop-blur-md items-center justify-center flex flex-col overflow-y-scroll"
              )}`}
              style={{
                backgroundImage:
                  "url(/assets/components/code-engine-bg-1.webp)",
                backgroundSize: "cover",
              }}
            >
              {isExtended}
              <div className="absolute top-2 right-24 z-50">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 bg-black/50 z-50"
                        onClick={() => {
                          setIsExtended((prev) => !prev);
                          setIsCopied(false);
                          setTriggerController(true);
                        }}
                      >
                        <Expand className="w-4 h-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expand</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {renderReset()}
              {renderCopy()}
              {renderContainer()}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={50}
            className="dark:text-white text-black lg:h-auto h-[400px] overflow-y-scroll"
          >
            <ScrollArea className=" w-full h-[400px] max-w-md mx-auto p-8">
              <div className="w-full h-auto items-start justify-start flex flex-col gap-2 my-6">
                <Label htmlFor="animation-type" className="font-bold">
                  Choose Animation Model
                </Label>
                <Select onValueChange={handleAnimationTypeChange}>
                  <SelectTrigger
                    className="w-full cursor-pointer dark"
                    id="animation-type"
                  >
                    <SelectValue placeholder={`${tab}`} />
                  </SelectTrigger>
                  <SelectContent className="w-full dark">
                    <SelectGroup>
                      <SelectItem
                        key="MotionContainer"
                        value="MotionContainer"
                        className="cursor-pointer"
                      >
                        In View
                      </SelectItem>
                      <SelectItem
                        key="MotionQueue"
                        value="MotionQueue"
                        className="cursor-pointer"
                      >
                        Timeline
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full h-auto items-start justify-start flex flex-col gap-2 my-6">
                <Label htmlFor="duration" className="font-bold">
                  Animation Type
                </Label>
                <Select onValueChange={handleAddAnimation}>
                  <SelectTrigger className="w-full dark ">
                    <SelectValue
                      placeholder={`${
                        animation === DEFAULT_ANIMATION
                          ? "Add Animation"
                          : animation[animation.length - 1]?.toString()
                      }`}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full dark">
                    <SelectGroup>
                      {Object.keys(animations).map((key, idx) => (
                        <SelectItem
                          key={idx}
                          value={key}
                          className="cursor-pointer capitalize"
                        >
                          {key}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                  </SelectContent>
                </Select>
                <div className="w-full h-auto items-start justify-start flex flex-wrap gap-4 ">
                  <Card className="w-full p-4 gap-4 flex flex-col bg-gradient-to-br from-sky-500/10 via-rose-500/10 to-emerald-500/10">
                    <Label htmlFor="animationList" className="font-bold">
                      Chosen Animations
                    </Label>
                    <ul
                      className="w-full h-auto flex flex-col gap-2"
                      id="animationList"
                    >
                      {animation.length === 0 && (
                        <MotionContainer
                          elementType={"li"}
                          duration={0.5}
                          className="w-full"
                          configView={{ once: true, amount: 0.5 }}
                          mode={["fadeIn", "filterBlurIn"]}
                        >
                          <li className="cursor-pointer gap-2 w-full h-auto flex items-center justify-between text-start ">
                            No Animation Added
                          </li>
                        </MotionContainer>
                      )}
                      {animation.map((item, idx) => (
                        <MotionContainer
                          elementType={"li"}
                          duration={0.5}
                          key={idx}
                          className="w-full"
                          configView={{ once: true, amount: 0.5 }}
                          mode={["fadeIn", "filterBlurIn"]}
                          children={
                            <Button
                              variant={"outline"}
                              key={idx}
                              className="cursor-pointer gap-2 w-full h-auto flex items-center justify-between text-start "
                              onClick={() => handleRemoveAnimation(item)}
                            >
                              <span className="capitalize"> {item}</span>
                              <X className="w-4 h-4" />
                            </Button>
                          }
                          delay={idx * 0.25}
                        />
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="w-full h-auto items-start justify-start flex flex-col gap-2 my-6">
                  <Label htmlFor="duration" className="font-bold">
                    Animation Duration
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="duration"
                    step="0.5"
                    max={10}
                    min={0.5}
                    value={config.duration}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        duration: parseFloat(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-auto items-start justify-start flex flex-col gap-2 pb-6">
                <Label htmlFor="transition" className="font-bold">
                  Transition Type
                </Label>
                <Select
                  onValueChange={handleChangeTransition}
                  value={transition}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={`${
                        transition === "smooth"
                          ? "Change Transition"
                          : transition[transition.length - 1]?.toString()
                      }`}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full dark">
                    <SelectGroup>
                      {Object.keys(transitions).map((key, idx) => (
                        <SelectItem
                          key={idx}
                          value={key}
                          className="cursor-pointer capitalize"
                        >
                          {key}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                  </SelectContent>
                </Select>
                <Card className="w-full px-4">
                  <div className="flex items-center justify-between gap-2 my-4 ">
                    <Label htmlFor="switch">Toggle Reverse</Label>
                    <Switch
                      id="switch"
                      checked={config.reverse}
                      onCheckedChange={() =>
                        setConfig((prev) => ({
                          ...prev,
                          reverse: !config.reverse,
                        }))
                      }
                    />
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {isExtended && (
        <div className="w-full h-screen fixed z-50 backdrop-blur-lg bg-black/50 items-center justify-center flex flex-row inset-0 gap-8 text-white">
          <div
            className={`${cn(
              className,
              "backdrop-blur-md items-center justify-center w-1/3 h-1/2 border-stone-900 border rounded-lg flex "
            )}`}
            style={{
              backgroundImage: "url(/assets/components/code-engine-bg-1.webp)",
              backgroundSize: "cover",
            }}
          >
            {renderReset()}
            {renderContainer()}
            <Button
              variant="outline"
              className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 text-black dark:text-white z-[50] absolute top-2 right-14"
              onClick={() => {
                setIsExtended((prev) => !prev);
              }}
            >
              <Expand className="w-4 h-4" />
            </Button>
          </div>
          <div className="backdrop-blur-md border border-stone-900 items-center justify-center w-1/3 h-1/2 rounded-lg">
            <CodeProvider
              code={finalCode}
              desc={tab?.toString() || ""}
              rounded
              showLineNumbers
            />
          </div>
        </div>
      )}
    </>
  );
}
