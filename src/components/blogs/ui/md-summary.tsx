import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import React, {
  Children,
  isValidElement,
  useId,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from "react";

// converts MDX <Summary>...</Summary> into an AccordionTrigger
export const MdSummary: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  return children;
};

type DetailsProps = PropsWithChildren<Record<string, unknown>> & {
  className?: string;
};

/**
 * Converts MDX <Details><Summary>...</Summary>body</Details>
 */
export const MdDetails: FC<DetailsProps> = ({
  children,
  className,
  ...rest
}) => {
  const all = Children.toArray(children);

  const meaningful = all.filter((c) => {
    if (typeof c === "string") return c.trim().length > 0;
    if (typeof c === "number") return true;
    return true;
  });

  if (meaningful.length === 0) {
    throw new Error(
      "Parse error during MDX compilation: 'MdDetails' must have at least one child",
    );
  }

  const first = meaningful[0] as ReactElement | string | number;
  let triggerContent: React.ReactNode;
  let contentChildren: React.ReactNode[] = [];

  const isSummaryElement =
    isValidElement(first) &&
    (first.type === MdSummary ||
      (typeof first.type === "string" &&
        first.type.toLowerCase() === "summary"));

  if (isSummaryElement) {
    triggerContent = (first as ReactElement as { props: { children: string } })
      .props.children;
    contentChildren = meaningful.slice(1);
  } else {
    triggerContent = first;
    contentChildren = meaningful.slice(1);
  }

  const id = useId();

  return (
    <Card
      className={cn(
        "my-4 px-6 py-1 bg-transparent dark:border-rose-500/50 border-rose-500",
        className,
      )}
    >
      <Accordion type="single" collapsible {...rest}>
        <AccordionItem value={id}>
          <AccordionTrigger className="relative">
            <BrainCircuit className="rotate-90 shrink-0 size-6 absolute -left-8 -top-2 transition-transform will-change-transform duration-500 ease-in-out text-rose-500" />
            <div className="inline-block">{triggerContent}</div>
          </AccordionTrigger>
          <AccordionContent>{contentChildren}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default MdDetails;
