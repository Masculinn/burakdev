import { getImagePlaceholder } from "@/lib/getImagePlaceholder";
import NextImage from "next/image";
import type { ComponentProps, FC } from "react";

interface LqipImageProps extends ComponentProps<typeof NextImage> {
  src: string;
  alt: string;
  fill?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export const LqipImage: FC<LqipImageProps> = ({
  alt,
  src,
  loading,
  fill,
  className,
  fetchPriority,
  ...props
}) => {
  if (!src) return null;

  const placeholder = fill
    ? getImagePlaceholder(src, false)
    : getImagePlaceholder(src, true);

  if (!placeholder) return null;

  if (typeof placeholder === "object") {
    return (
      <NextImage
        alt={alt}
        src={src}
        blurDataURL={placeholder.base64}
        placeholder="blur"
        loading={loading}
        title={alt}
        fetchPriority={fetchPriority}
        className={className}
        {...placeholder}
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
