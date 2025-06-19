import { ZoomableImageProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

const ZoomableImage: FC<ZoomableImageProps> = (props) => {
  const { alt, height = 500, src, width = 500, className = "" } = props;

  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={cn(
        "rounded-lg hover:scale-105 transition-all duration-200 object-cover",
        className
      )}
    />
  );
};

export default React.memo(ZoomableImage);
