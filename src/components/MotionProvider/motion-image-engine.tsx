import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimationKeys,
  TransitionKeys,
  DelayLogic,
  ImageMotionCASProps,
  ImageMotionFnTypes,
} from "@/components/MotionProvider/types";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Check,
  Copy,
  Dice4,
  Expand,
  Lightbulb,
  Link2,
  Pause,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import MotionImage from "./motion-image";
import MotionContainer from "./motion-container";
import MotionQueue from "./motion-queue";
import copyCode from "@/utils/copyCode";
import CodeProvider from "../Documentation/code-provider";
import { ScrollArea } from "../ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSelector } from "react-redux";
import { ImageMotionEnginePresetProps, ReduxThemeProps } from "@/interfaces";
import { VscDebugRestart } from "react-icons/vsc";
import transitionsLib from "./lib/transitions.lib";
import animationsLib from "./lib/animate.lib";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import _ from "lodash";
import generateRandomImageAnimations from "@/utils/generateRandomImageAnimations";

const DEFAULT_ANIMATION = ["funPeekABoo"] as AnimationKeys[];

const DELAY_LOGICS = [
  "linear",
  "exponential",
  "sinusoidal",
  "cosine",
  "square",
  "triangle",
  "sawtooth",
  "fibonacci",
  "pendulum",
  "perlin",
  "chaotic",
  "cumulative",
  "bounce",
  "spiral",
  "quantum",
];

const PRESETS: ImageMotionEnginePresetProps[] = [
  {
    name: "sea",
    style: "bg-gradient-to-br from-rose-500 via-sky-500 to-indigo-500",
  },
  {
    name: "woman",
    style: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-indigo-500",
  },
  {
    name: "moon",
    style: "bg-gradient-to-br from-rose-500 via-sky-500 to-indigo-500",
  },
  {
    name: "fractal",
    style: "bg-black",
  },
  {
    name: "tree",
    style: "bg-gradient-to-br from-green-500 to-black",
  },
];

const DEFAULT_CONFIG = {
  totalDelay: 0.5,
  animationDuration: 1,
  totalDuration: 2,
  pieces: 144,
  delayLogic: "sinusoidal" as DelayLogic,
  transition: "cubicElastic" as TransitionKeys,
  once: true,
  motionFn: undefined as ImageMotionFnTypes | undefined,
  amount: "some" as "some" | "all",
};

const animationLib = Object.keys(animationsLib).filter(
  (val) => val !== "default"
);
const transitionLib = Object.keys(transitionsLib).filter(
  (val) => val !== "custom"
);

export default function ImageMotionEngine() {
  const isMobile = useIsMobile();
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );

  const [key, setKey] = useState<number>(0);
  const [config, setConfig] = useState<{ [key: string]: any }>(DEFAULT_CONFIG);
  const [stopAnimation, setStopAnimation] = useState<boolean>(false);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("/assets/presets/tree.webp");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [isRandomized, setIsRandomized] = useState<boolean>(false);

  const [animation, setAnimation] =
    useState<AnimationKeys[]>(DEFAULT_ANIMATION);

  useEffect(() => {
    PRESETS.forEach((preset) => {
      const img = new Image();
      img.src = `/assets/presets/${preset.name.toLowerCase()}.${
        preset.name.toLowerCase().includes("fra") ? "gif" : "webp"
      }`;
    });
  }, []);

  const controlConfig = useMemo(
    () =>
      ({
        isAnimationStopped: stopAnimation,
        reverse: reverseAnimation,
        isControlled: true,
      } as ImageMotionCASProps),
    [stopAnimation, reverseAnimation]
  );

  useEffect(() => setKey((prev) => prev + 1), [config, animation, imageUrl]);

  const code = useMemo(
    () =>
      `
import MotionImage from "@/components/MotionProvider/motion-image";

const MotionedImage = () => (
    <MotionImage
      isDynamicallyQueued
      totalDelay={${config.totalDelay}}
      animationDuration={${config.animationDuration}}
      delayLogic="${config.delayLogic}"
      transition="${config.transition}"
      imageUrl={${JSON.stringify(
        PRESETS.find((val) => imageUrl.includes(val.name))?.name ??
          (imageUrl as string)
      )}}
      pieces={${config.pieces}}
      wrapperClassName="w-full h-full"
      animations={${JSON.stringify(animation)}}
      ${config.motionFn ? `motionFn={${config.motionFn}}` : ""}
    />
)
  `.trim(),
    [config, animation, imageUrl]
  );

  const handleCopy = useCallback(() => {
    copyCode(code).then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 1000);
  }, [code]);

  const renderPreview = useCallback(
    () => (
      <div className="absolute h-full w-full">
        <MotionImage
          fallback={<Skeleton className="w-full h-full absolute" />}
          pieces={config.pieces}
          key={key}
          isDynamicallyQueued
          controlConfig={controlConfig}
          {...config}
          animations={animation}
          imageUrl={imageUrl}
          wrapperClassName="w-full h-full"
        />
      </div>
    ),
    [key, config, animation, stopAnimation, reverseAnimation]
  );

  const handleRemoveAnim = (anim: AnimationKeys) => {
    setAnimation((prev) =>
      prev.length === 1 ? ["opacity"] : prev.filter((a) => a !== anim)
    );
  };

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
              className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50"
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
    setKey((prev) => prev + 1);
    setStopAnimation(false);
    setReverseAnimation(false);
  };

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
              duration={config.totalDuration}
              key={key}
              children={
                <VscDebugRestart
                  className={`w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50`}
                />
              }
              configView={{
                once: false,
                amount: 0.5,
              }}
              className=" rounded-xl "
              mode={["spin"]}
              elementType="div"
              transition={config.transition}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Trigger Animation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }, [key]);

  const renderDice = useCallback(() => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="z-50 absolute top-2 right-[8.5rem]"
            onClick={handleRandomize}
          >
            <MotionContainer
              delay={0}
              duration={config.totalDuration}
              children={
                <Dice4 className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50" />
              }
              isControlled={{ trigger: !isRandomized }}
              configView={{
                once: false,
                amount: 0.5,
              }}
              className="rounded-xl"
              mode={["spin"]}
              elementType="div"
              transition={config.transition}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Roll a dice!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }, [isRandomized]);

  const handlePreset = (item: number) => {
    const findPreset = PRESETS.find((_, index) => index === item);
    const { name } = findPreset!;
    if (name.toLowerCase().includes("fra")) {
      const url = `/assets/presets/${name}.gif`;
      return setImageUrl(url);
    }

    const url = `/assets/presets/${name.toLowerCase()}.webp`;
    return setImageUrl(url);
  };

  const handleFn = ({
    checked,
    fn,
  }: {
    checked: boolean;
    fn: ImageMotionFnTypes;
  }) => {
    setConfig((prev) => ({
      ...prev,
      motionFn: checked ? fn : undefined,
    }));
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setAnimation(DEFAULT_ANIMATION);
    setStopAnimation(false);
    setReverseAnimation(false);
  };

  const handleStopAnimation = () => {
    setStopAnimation(true);
    setReverseAnimation(false);
  };

  const handleRandomize = () => {
    setIsRandomized((prev) => !prev);

    const config = generateRandomImageAnimations({
      resolve: true,
    });

    setStopAnimation(false);
    setReverseAnimation(false);
    setAnimation(
      config.animations.length > 0 ? config.animations : ["opacity"]
    );
    setConfig((prev) => ({
      ...prev,
      ...config,
    }));
  };

  return (
    <>
      <div className="w-full lg:h-auto h-screen border rounded-lg my-4 relative bg-gradient-to-br dark:from-slate-950  dark:via-neutral-900 dark:to-black">
        <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
          <ResizablePanel defaultSize={50} className="relative">
            <div className="relative h-full w-full flex items-center justify-center">
              {renderPreview()}
              {renderCopy()}
              {renderReset()}
              {renderDice()}
              <Button
                variant="outline"
                className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 text-black dark:text-white z-[50] absolute top-2 right-24"
                onClick={() => {
                  setIsExtended((prev) => !prev);
                }}
              >
                <Expand className="w-4 h-4" />
              </Button>
              {config.motionFn && (
                <Badge className="absolute top-4 left-4 capitalize">
                  {config.motionFn} The Image!
                </Badge>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="h-[500px] p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="font-bold text-lg">
                    Choose Image Presets
                  </Label>
                  <div className="h-auto items-center justify-start flex flex-row lg:gap-3 gap-1">
                    {PRESETS.map((item, idx) => (
                      <TooltipProvider key={idx}>
                        <Tooltip>
                          <TooltipTrigger
                            className={cn(
                              `w-8 h-8 rounded-full ${
                                imageUrl.includes(item.name) &&
                                "scale-105 border dark:border-white border-black"
                              } `,
                              item.style
                            )}
                            onClick={() => handlePreset(idx)}
                          />
                          <TooltipContent>
                            <span className="text-sm tracking-tight capitalize">
                              {item.name}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    <div className="lg:w-24 items-start justify-center flex flex-col gap-1">
                      <Label
                        htmlFor="imgText"
                        className="text-xs dark:text-neutral-400 flex flex-row gap-1"
                      >
                        <span>Image</span>
                        <Link2 className="w-4 h-4" />
                      </Label>
                      <Input
                        id="imgText"
                        type="text"
                        value={imageUrl}
                        className="min-w-40 h-6 "
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2  lg:w-full w-4/5">
                  <Label className="text-lg font-bold tracking-tight">
                    Animations
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setAnimation((prev) => [
                        ...prev.filter((r) => r !== "opacity"),
                        value as AnimationKeys,
                      ])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation" />
                    </SelectTrigger>
                    <SelectContent className={cn(appTheme)}>
                      {animationLib.map((anim) => (
                        <SelectItem key={anim} value={anim}>
                          {anim}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {animation.map((anim, idx) => (
                      <MotionContainer
                        elementType={"div"}
                        duration={0.5}
                        key={anim}
                        configView={{ once: true, amount: 0.5 }}
                        mode={["fadeIn", "filterBlurIn"]}
                        children={
                          <Button
                            key={anim}
                            variant="secondary"
                            className="capitalize"
                            size="sm"
                            onClick={() => handleRemoveAnim(anim)}
                          >
                            {anim}
                            <X className="ml-2 h-3 w-3" />
                          </Button>
                        }
                        delay={idx * 0.25}
                      />
                    ))}
                  </div>
                </div>
                <h2 className="text-base font-bold tracking-tight">
                  Animation Configurations
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="w-full h-auto flex flex-row gap-4">
                    <div className="space-y-2 w-1/2">
                      <Label>Total Delay</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min={0}
                        max={100}
                        value={config.totalDelay}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            totalDelay: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2 w-1/2">
                      <Label htmlFor="duration">
                        {!isMobile && "Animation"} Duration
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        step="0.5"
                        max={10}
                        min={0.5}
                        value={config.animationDuration}
                        onChange={(e) =>
                          Number(e.target.value) > 0 &&
                          setConfig((prev) => ({
                            ...prev,
                            animationDuration: parseFloat(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2 ">
                    <Label>Pieces</Label>
                    <Input
                      type="number"
                      min={24}
                      max={500}
                      step="1"
                      value={config.pieces}
                      onChange={(e) =>
                        Number(e.target.value) > 0 &&
                        setConfig((prev) => ({
                          ...prev,
                          pieces: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <p className="lg:text-sm text-xs text-amber dark:text-red-500 -mt-3">
                    *Do not make the pieces more than 500!!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Transition</Label>
                    <Select
                      value={config.transition}
                      onValueChange={(value) =>
                        setConfig((prev) => ({
                          ...prev,
                          transition: value as TransitionKeys,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Transition" />
                      </SelectTrigger>
                      <SelectContent className={cn(appTheme)}>
                        {transitionLib.map((transition) => (
                          <SelectItem key={transition} value={transition}>
                            {transition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Delay Logic</Label>
                    <Select
                      value={config.delayLogic}
                      onValueChange={(value) =>
                        setConfig((prev) => ({
                          ...prev,
                          delayLogic: value as DelayLogic,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Delay Logic" />
                      </SelectTrigger>
                      <SelectContent className={cn(appTheme)}>
                        {DELAY_LOGICS.map((logic) => (
                          <SelectItem key={logic} value={logic}>
                            {logic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full  border dark:border-stone-800 border-stone-200 rounded-xl min-h-min p-6 items-center justify-start flex flex-col gap-3">
                  <h2 className="text-base font-bold tracking-tight self-start ">
                    Functionalities
                  </h2>
                  <div className="w-full h-auto items-center justify-between flex flex-row tracking-tighter">
                    <Label htmlFor="loop" className="">
                      {config.motionFn === "hover"
                        ? "Deactivate Hover Effect"
                        : "Activate Hover Effect"}
                    </Label>
                    <Switch
                      id="loop"
                      checked={config.motionFn === "hover"}
                      onCheckedChange={(checked) =>
                        handleFn({ checked, fn: "hover" })
                      }
                    />
                  </div>
                  <div className="w-full h-auto items-center justify-between flex flex-row">
                    <Label htmlFor="loop" className="">
                      {config.motionFn === "click"
                        ? "Deactivate Click Effect"
                        : "Activate Click Effect"}
                    </Label>
                    <Switch
                      id="loop"
                      checked={config.motionFn === "click"}
                      onCheckedChange={(checked) =>
                        handleFn({ checked, fn: "click" })
                      }
                    />
                  </div>
                  <div className="w-full h-auto items-center justify-between flex flex-row mt-2">
                    <Button
                      variant="default"
                      className="w-full"
                      size="sm"
                      onClick={handleResetConfig}
                    >
                      Reset Configurations
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {isExtended && (
        <div className="w-full h-screen fixed z-50 backdrop-blur-lg bg-black/50 items-center justify-center flex flex-row inset-0 gap-8 text-white">
          <div className="items-center justify-center w-1/3 h-1/2 flex relative">
            <Button
              variant="outline"
              className="w-8 h-8 cursor-pointer rounded-full text-black dark:text-white top-4 right-16 absolute z-50"
              onClick={() => setIsExtended(false)}
            >
              <Expand className="w-4 h-4" />
            </Button>

            {renderReset()}
            {renderPreview()}
          </div>
          <div className="backdrop-blur-md border border-stone-900 items-center justify-center w-1/3 h-1/2 rounded-lg">
            <CodeProvider
              code={code}
              desc="ImageMotion"
              rounded
              appTheme={appTheme}
              bordered
              fontSize={isMobile ? "sm" : "md"}
              lang="typescript"
              showLineNumbers
            />
          </div>
        </div>
      )}
      <MotionContainer
        elementType={"div"}
        configView={{ once: false, amount: 0.5 }}
        mode={["filterBlurIn", "fadeIn"]}
        transition="cubicFastEnd"
        duration={0.5}
        className="
        fixed
        left-1/2
        transform
        -translate-x-1/2
        translate-y-1/2
        dark:bg-white
        dark:text-black
        text-white
        bg-neutral-900
        backdrop-blur-sm
        z-50
        flex
        items-center
        justify-center
        lg:bottom-16
        bottom-12
        h-12
        lg:w-80
        w-48
        rounded-2xl
        flex-row
        gap-2
        border-2
        border-neutral-800
        "
      >
        <MotionQueue
          elementType={"div"}
          duration={1}
          delayLogic="linear"
          isDynamicallyQueued
          animations={[
            {
              mode: ["rotateClockwise", "fadeIn"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: ["rotateClockwise", "fadeIn"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
            {
              mode: ["rotateClockwise", "fadeIn"],
              configView: { once: false, amount: 0.5 },
              duration: 0.5,
            },
          ]}
          children={[
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={1}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setReverseAnimation((prev) => !prev);
                      setStopAnimation(false);
                    }}
                    variant={"ghost"}
                    className="text-xs rounded-full"
                    key="skip"
                  >
                    {reverseAnimation ? <SkipForward /> : <SkipBack />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {reverseAnimation
                      ? "Start Animations"
                      : "Reverse Animations"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={2}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleStopAnimation}
                    variant={"ghost"}
                    className="text-xs rounded-full"
                    key="stop"
                  >
                    {stopAnimation ? <SkipForward /> : <Pause />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stopAnimation ? "Show Animations" : "Skip Animations"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
            <TooltipProvider skipDelayDuration={0} delayDuration={0} key={2}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/motion-provider/centralized-animation-system">
                    <Button
                      onClick={() => {
                        setStopAnimation(true);
                        setReverseAnimation(false);
                      }}
                      variant={"ghost"}
                      className="text-xs rounded-full"
                      key="stop"
                    >
                      <Lightbulb />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How this works?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
          ]}
        />
      </MotionContainer>
    </>
  );
}
