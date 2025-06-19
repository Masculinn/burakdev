import { PingProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

const Ping: FC<PingProps> = (props) => {
  const { isAnimated, mode, size, className } = props;
  const elSize =
    size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5";
  const modeClass =
    mode === "success"
      ? "bg-green-400"
      : mode === "error"
      ? "bg-red-400"
      : "bg-amber-500";
  return (
    <span
      className={cn(
        `${isAnimated && "animate-pulse"} inline-flex  rounded-full`,
        className,
        elSize,
        modeClass
      )}
    />
  );
};

export default React.memo(Ping);
