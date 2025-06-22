import Image from "next/image";
import { FC } from "react";

export const MdImage: FC<
  React.HTMLAttributes<HTMLImageElement> & { alt: string; src: string }
> = ({ className, alt, src, ...props }) => (
  <Image
    height={600}
    width={1200}
    alt={alt}
    className={`${className} h-60 w-auto  object-contain mx-auto lg:mt-8 mt-2 lg:mb-2`}
    src={src}
    {...props}
  />
);
