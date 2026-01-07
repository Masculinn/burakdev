import { LqipImage } from "@/components/lqip-image";
import type { HTMLAttributes } from "@/interfaces";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type MdImageProps = HTMLAttributes<HTMLImageElement> & {
  src?: unknown;
  alt?: string;
};

export const MdImage: FC<MdImageProps> = ({
  src,
  alt,
  className,
  ...props
}: MdImageProps) => {
  if (typeof src !== "string" || !src) {
    throw new Error("MDX parsing error: 'MdImage' src must be a string.");
  }

  const shouldBeFigure =
    (props as Record<string, unknown>)["data-unwrap"] !== undefined ||
    (props as Record<string, unknown>)["data-unwrap"] === "1";

  if (!shouldBeFigure) {
    return (
      <LqipImage
        src={src}
        alt={alt ?? "Unknown image"}
        loading="lazy"
        className={cn("rounded-md", className)}
        {...props}
      />
    );
  }

  return (
    <figure className="flex flex-col items-center justify-center md:gap-4 gap-2 text-center md:my-8 my-4 rounded-md relative">
      <LqipImage
        src={src}
        alt={alt ?? "Noname image"}
        loading="lazy"
        className={cn("rounded-md shadow-xl", className)}
        {...props}
      />
      {alt ? (
        <figcaption className="text-muted-foreground italic text-sm">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
};
