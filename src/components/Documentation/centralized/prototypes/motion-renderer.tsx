import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MotionRendererProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import { FC, memo, useCallback, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import CodeProvider from "../../code-provider";
import { Badge } from "@/components/ui/badge";
import MotionContainer from "@/components/MotionProvider/motion-container";

const MotionRenderer: FC<MotionRendererProps> = (props) => {
  const {
    children,
    wrapperClassName,
    contentClassName,
    code,
    desc = "bash",
    theme = "dark",
    isMobile = false,
  } = props;
  const [isExtended, setIsExtended] = useState<boolean>(false);

  const [key, setKey] = useState<number>(0);

  const handleTrigger = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const renderReset = useCallback(() => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="absolute top-2 right-4 z-[99]"
            onClick={handleTrigger}
          >
            <MotionContainer
              delay={0}
              duration={1}
              key={key}
              children={
                <VscDebugRestart
                  className={`w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50 bg-white text-black dark:text-white`}
                />
              }
              configView={{
                once: false,
                amount: 0.5,
              }}
              className=" rounded-xl "
              mode={["spin"]}
              elementType="div"
              transition="smooth"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Trigger Animation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }, [handleTrigger]);

  const renderExpand = useCallback(() => {
    return (
      <div
        className={cn(
          "absolute z-50",
          isExtended ? "top-0 right-14" : "top-2 right-14 z-[99]"
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="w-8 h-8 cursor-pointer rounded-full m-2 p-2 dark:bg-black/50 dark:text-white text-black bg-white"
                onClick={() => setIsExtended((prev) => !prev)}
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
    );
  }, [isExtended, code]);

  return (
    <>
      <div className={cn(`relative `, wrapperClassName)} key={key}>
        {renderReset()}
        {renderExpand()}
        <div className={cn("relative", contentClassName)}>{children}</div>
        <Badge className="absolute bottom-4 right-4 z-[88]">{desc}</Badge>
      </div>
      {isExtended && (
        <div className="w-full h-screen  fixed backdrop-blur-lg bg-black/50 items-center justify-center flex lg:flex-row flex-col inset-0 lg:gap-8 gap-4 text-white py-24 p-8 lg:p-0 z-[999]">
          <div className="backdrop-blur-md border border-stone-900 items-center justify-center lg:max-w-3xl lg:mx-auto h-1/2 w-full rounded-lg">
            {renderExpand()}
            <CodeProvider
              wrapperStyle="max-w-3xl mx-auto w-full"
              code={code}
              desc={desc}
              rounded
              showLineNumbers
              fontSize={isMobile ? "sm" : "md"}
              appTheme={theme}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(MotionRenderer);
