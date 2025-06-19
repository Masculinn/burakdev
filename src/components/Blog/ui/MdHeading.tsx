import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { MdHeadingProps } from "../types/interfaces";

export const MdHeading: FC<MdHeadingProps> = ({
  as: Component = "h1",
  size = "xl",
  className,
  ...props
}) => {
  const sizeClasses = {
    xl: "text-4xl font-bold",
    lg: "text-3xl font-bold",
    md: "text-2xl font-semibold",
    sm: "text-xl font-semibold",
    xs: "text-lg font-medium",
  };

  return <Component className={cn(sizeClasses[size], className)} {...props} />;
};
