import { FC, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import RenderRadar from "./centralized/prototypes/render-radar";
import { ArrowRight } from "lucide-react";
import instructionsLib from "@/lib/instructions.lib";
import { cn } from "@/lib/utils";

const Instructions: FC = () => {
  const [step, setStep] = useState<number>(0);

  const handleNext = () => {
    if (step === instructionsLib.length) return;

    setStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (step === 0) return;

    setStep((prev) => prev - 1);
  };

  const renderComponent = useCallback(() => {
    const selectedComponent =
      instructionsLib.find((val) => val.id === step) || instructionsLib[0];

    return <RenderRadar {...selectedComponent} />;
  }, [step]);

  const renderStep = useCallback(() => {
    return (
      <span className="font-bold text-xs absolute bottom-4 left-4 z-50 font-mono tracking-tighter">
        {step === instructionsLib.length
          ? "Done!"
          : `${instructionsLib.length - step} Step Left.`}{" "}
      </span>
    );
  }, [step]);
  return (
    <div className="w-full h-96 dark:bg-white dark:text-black rounded-xl bg-black text-white flex flex-col items-center justify-center relative">
      {step === 0 ? (
        <>
          <Button
            className="z-50 p-8 rounded-2xl dark:hover:text-stone-900 hover:text-slate-300"
            variant="link"
            onClick={handleNext}
          >
            <span className="font-bold text-4xl dark:text-black text-white">
              I am ready Burak!
            </span>
          </Button>
          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary">
              This component is powered by Motion Provider.
            </Badge>
          </div>
        </>
      ) : (
        renderComponent()
      )}
      <Button
        className={cn(`z-50 absolute top-4 left-4`, step === 0 && "hidden")}
        variant="ghost"
        onClick={handlePrev}
      >
        <ArrowRight className="rotate-180" />
      </Button>
      <Button
        variant="ghost"
        onClick={handleNext}
        className={cn(
          `z-50 absolute top-4 right-4`,
          step === instructionsLib.length && "hidden"
        )}
      >
        <ArrowRight />
      </Button>

      {renderStep()}
    </div>
  );
};

export default Instructions;
