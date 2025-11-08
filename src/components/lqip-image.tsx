import { getImagePlaceholder } from "@/lib/getImagePlaceholder";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useEffect, useState, type FC, type HTMLAttributes } from "react";
import { Skeleton } from "./ui/skeleton";

type LqipImageType = {
  src: string;
  alt: string;
  fill?: boolean;
  method?: "css" | "base64" | "skeleton";
  loading?: "eager" | "lazy";
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
} & HTMLAttributes<HTMLImageElement>;

export const LqipImage: FC<LqipImageType> = ({
  alt,
  src,
  loading,
  method,
  fill,
  className,
  fetchPriority,
  ...props
}) => {
  if (!src || !method) return null;

  switch (method) {
    case "skeleton": {
      return (
        <ViewSkeleton src={src} alt={alt} fill={fill} className={className} />
      );
    }
    case "base64": {
      const placeholder = !fill
        ? getImagePlaceholder(src, "base64", true)
        : getImagePlaceholder(src, "base64");
      if (!placeholder) return null;
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
    }
    case "css": {
      if (!fill) {
        const placeholder = getImagePlaceholder(src, "css", true);
        if (!placeholder) return null;
        const { css, ...props } = placeholder;
        return (
          <div
            className={cn(
              "relative aspect-auto block overflow-hidden",
              className
            )}
          >
            <div
              className={cn(
                "absolute inset-1 scale-150 transform filter blur-2xl  object-cover"
              )}
              style={css}
            />
            <NextImage
              alt={alt}
              src={src}
              loading={loading}
              title={alt}
              fetchPriority={fetchPriority}
              {...props}
            />
          </div>
        );
      }

      const placeholder = getImagePlaceholder(src, "css");
      if (!placeholder) return null;
      return (
        <div
          className={cn(
            "relative aspect-auto block overflow-hidden",
            className
          )}
        >
          <div
            className={cn(
              "absolute inset-1 scale-150 transform filter blur-2xl object-cover"
            )}
            style={placeholder}
          />
          <NextImage
            alt={alt}
            src={src}
            loading={loading}
            title={alt}
            fetchPriority={fetchPriority}
            fill
            {...props}
          />
        </div>
      );
    }
    default:
      return null;
  }
};

function ViewSkeleton({
  src,
  alt,
  fill,
  className,
}: Omit<LqipImageType, "method">) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded ? (
        <Skeleton
          aria-hidden
          className={cn("size-full", fill ? "absolute inset-0" : "block")}
        />
      ) : (
        <NextImage
          src={src}
          fill={fill}
          alt={alt}
          loading="lazy"
          fetchPriority="low"
          className={cn("object-cover", fill && "absolute inset-0")}
          title={alt}
          {...(fill && { sizes: "100vw" })}
        />
      )}
    </div>
  );
}
