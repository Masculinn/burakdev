import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import extractTextFromReactNode from "@/utils/extractTextFromReactNode";
import { Info } from "lucide-react";
import React, { FC } from "react";

export const MdBlockquote: FC<React.HTMLAttributes<HTMLQuoteElement>> = ({
  className,
  ...props
}) => {
  const text = extractTextFromReactNode(props.children);

  return (
    <blockquote className="flex flex-col gap-2 my-6">
      <Alert>
        <AlertTitle className="font-bold lg:text-xl text-lg text-primary flex flex-row-reverse gap-2 justify-between">
          <Info />
          <span>Note</span>
        </AlertTitle>
        <AlertDescription className="text-muted-foreground md:text-sm text-xs">
          {text}
        </AlertDescription>
      </Alert>
    </blockquote>
  );
};
