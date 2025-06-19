import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdHr: FC<React.HTMLAttributes<HTMLHRElement>> = ({
  className,
  ...props
}) => <Separator {...props} className={cn("lg:my-16 my-12", className)} />;
