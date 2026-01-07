import { getImagePlaceholder } from "@/lib/getImagePlaceholder";
import NextImage from "next/image";
import type { FC, HTMLAttributes } from "react";

interface LqipImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

// metadata = false => fill
// metadata = true => base64

export const LqipImage: FC<LqipImageProps> = ({
  alt,
  src,
  loading,
  fill,
  className,
  fetchPriority,
  ...props
}) => {
  if (!src) {
    console.warn("⚠️ Returning null, not found src prop for lqip-image fn.");
    return null;
  }

  const placeholder = fill
    ? getImagePlaceholder(src, false)
    : getImagePlaceholder(src, true);

  if (!placeholder) {
    console.warn(
      "⚠️ Returning null, not found placeholder for",
      src,
      "at lqip-image fn."
    );
    return null;
  }

  if (typeof placeholder === "object") {
    return (
      <NextImage
        alt={alt}
        src={src}
        width={placeholder.width}
        height={placeholder.height}
        blurDataURL={placeholder.base64}
        placeholder="blur"
        loading={loading}
        title={alt}
        fetchPriority={fetchPriority}
        className={className}
        {...props}
      />
    );
  }

  return (
    <NextImage
      fill
      alt={alt}
      src={src}
      placeholder="blur"
      title={alt}
      blurDataURL={placeholder}
      loading={loading}
      className={className}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};
