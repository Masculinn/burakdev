import { cn } from "@/lib/utils";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { FC } from "react";
import {
  ComponentLibraryCardBodyProps,
  ComponentLibraryCardProps,
} from "@/interfaces";
import { Badge } from "./ui/badge";
import Marquee from "./ui/marquee";
import Ping from "./ui/ping";

const geist = Geist_Mono({ subsets: ["latin"], weight: "600" });

const CardBody: FC<ComponentLibraryCardBodyProps> = ({
  className = "p-4",
  description,
  link,
  name,
  level,
  techs,
}) => (
  <div
    className={cn(
      className,
      "leading-snug lg:leading-relaxed relative overflow-hidden"
    )}
  >
    <h3
      className={`text-medium font-extrabold lg:hidden text-gray-100 tracking-tighter  lg:mb-2 mb-1  absolute top-6 right-6 ${geist.className}`}
    >
      {name}
    </h3>
    <Badge className="hidden lg:block absolute top-8 right-8 font-bold">
      <Ping mode="warning" size="sm" isAnimated className="mr-2 pt-2" />
      <span className="capitalize">{level}</span>
    </Badge>

    <div className="w-full h-fit bg-gradient-to-b from-black/50 to-black/20 backdrop-blur-lg  lg:p-8 p-4">
      <h3
        className={`text-3xl font-extrabold text-gray-100 tracking-tighter mb-2  hidden lg:block relative  ${geist.className}`}
      >
        {name}
      </h3>
      <Marquee
        children={techs.map((val, idx) => (
          <Badge key={idx}>{val}</Badge>
        ))}
        className={`max-w-lg mx-auto lg:mx-0 hidden lg:flex mb-2 ${geist.className}`}
      />
      <p className="text-neutral-300 lg:line-clamp-3 line-clamp-1 hidden lg:block font-semibold mb-4">
        {description}
      </p>
      <Link href={link} className="lg:mt-4  mt-2">
        <Button variant={"outline"}>
          View Library <ArrowRight />
        </Button>
      </Link>
    </div>
  </div>
);

const Card: FC<ComponentLibraryCardProps & { children?: React.ReactNode }> = (
  props
) => {
  const {
    children = (
      <CardBody
        className="absolute inset-0 flex flex-col justify-end size-full "
        description={props.description}
        link={props.link}
        name={props.name}
        level={props.level}
        techs={props.techs}
      />
    ),
    image,
    alt,
  } = props;
  return (
    <div className="rounded-2xl relative aspect-[4/3] overflow-hidden group tracking-tight">
      <Image
        fill
        unoptimized
        className="w-full m-0 object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
        src={image}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      />
      <div className="absolute inset-0 from-black/95 via-black/20 to-black/10 bg-gradient-to-t" />
      {children}
    </div>
  );
};

export default Card;
