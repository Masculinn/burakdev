import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdParagraph: FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-base text-muted-foreground tracking-tight", className)}
    {...props}
  />
);
