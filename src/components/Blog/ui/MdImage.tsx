import Image from "next/image";
import { FC } from "react";
import { MdImageOptions } from "../types/interfaces";
import {
  AnimationKeys,
  DelayLogic,
  ImageMotionFnTypes,
  TransitionKeys,
} from "@/components/MotionProvider/types";
import { cn } from "@/lib/utils";

export const MdImage: FC<
  React.HTMLAttributes<HTMLImageElement> & { alt: string; src: string }
> = ({ className, alt, src, ...props }) => {
  let id: string | undefined = undefined;
  let actualAlt = alt;
  let obj: MdImageOptions = {
    dimensions: {
      height: 500,
      width: 500,
    },
    isAnimated: false,
  };

  if (typeof alt === "string" && alt.includes("|")) {
    const parts = alt.split("|").map((s) => s.trim());
    actualAlt = parts[0];
    id = parts[1];
  }

  if (id && typeof id === "string") {
    if (id.startsWith("_")) {
      obj = {
        ...obj,
        dimensions: {
          height: parseInt(id.slice(1).split("-")[1]),
          width: parseInt(id.slice(1).split("-")[0]),
        },
      };
    } else {
      const parts = id.split("-");
      const pieces = parseInt(parts[2]);
      const delayLogic: DelayLogic = parts[3] as DelayLogic;
      const transition: TransitionKeys = parts[4] as TransitionKeys;
      const fnLogic: ImageMotionFnTypes | undefined = parts[5].includes("none")
        ? undefined
        : parts[5].includes("hover")
        ? "hover"
        : "click";
      const animations: AnimationKeys[] = parts.slice(6) as AnimationKeys[];

      obj = {
        ...obj,
        isAnimated: true,
        dimensions: {
          height: parseInt(id.split("-")[1]),
          width: parseInt(id.split("-")[0]),
        },
        animations,
        delayLogic,
        transition,
        fn: fnLogic,
        pieces,
      };
    }
  }

  /*const isValidObj = Object.keys(obj).every(
    (key) => obj[key as keyof MdImageOptions] !== undefined
  );*/

  const style = cn(
    `aspect-square my-8 relative w-[${obj.dimensions.width}px] h-[${obj.dimensions.height}px] `,
    className
  );

  return (
    <Image
      height={obj.dimensions.height ?? 500}
      width={obj.dimensions.width ?? 500}
      alt={actualAlt || ""}
      className={style}
      id={id ?? "MdImage"}
      src={src}
    />
  );
};
