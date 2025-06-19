import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdCode: FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <code
    className={cn(
      "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground",
      className
    )}
    {...props}
  />
);
