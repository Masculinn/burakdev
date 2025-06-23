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
    xl: "lg:text-5xl text-4xl font-bold pt-2",
    lg: "lg:text-4xl text-3xl font-bold pt-2",
    md: "lg:text-3xl text-2xl font-semibold pt-2",
    sm: "lg:text-2xl text-xl font-semibold pt-2",
    xs: "lg:text-xl text-lg font-medium pt-2",
  };

  return <Component className={cn(sizeClasses[size], className)} {...props} />;
};
