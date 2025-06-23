import Image from "next/image";
import { FC } from "react";

export const MdImage: FC<
  React.HTMLAttributes<HTMLImageElement> & { alt: string; src: string }
> = ({ className, alt, src, ...props }) => (
  <Image
    height={600}
    width={1200}
    alt={alt}
    className={`${className} w-full lg:h-96 h-auto  object-contain mx-auto lg:my-8 my-4`}
    src={src}
    {...props}
  />
);
