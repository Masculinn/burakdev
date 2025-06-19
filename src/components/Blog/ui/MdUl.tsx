import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdUl: FC<React.HTMLAttributes<HTMLUListElement>> = ({
  className,
  ...props
}) => <ul className={cn("text-base list-disc ml-4", className)} {...props} />;
