import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdUl: FC<React.HTMLAttributes<HTMLUListElement>> = ({
  className,
  ...props
}) => (
  <ul className={cn("text-base my-2 list-disc pl-8", className)} {...props} />
);
