import { getImgAltName } from "@/lib/utils";
import MotionContainer from "@/motion/motion-container";
import { Expand } from "lucide-react";
import { type FC, useCallback, useState } from "react";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import { DialogTrigger } from "../ui/dialog";
import { DrawerTrigger } from "../ui/drawer";

type ImagePreviewProps = {
  img: string;
  onSelect: (img: string) => void;
  triggerMode: "drawer" | "dialog";
};

export const ImagePreview: FC<ImagePreviewProps> = ({
  img,
  onSelect,
  triggerMode,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleClick = useCallback(() => onSelect(img), [img, onSelect]);

  const Trigger = triggerMode === "dialog" ? DialogTrigger : DrawerTrigger;

  return (
    <Trigger onClick={handleClick}>
      <MotionContainer
        animation={{
          mode: "microWobble",
          transition: "gentle",
          duration: 1,
        }}
        elementType="div"
        className="relative hover:z-50 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(false)}
        controller={{
          trigger: !isHovered,
        }}
      >
        <AspectRatio
          ratio={1 / 1}
          className="rounded-md outline-muted outline-1 relative overflow-hidden"
        >
          <MotionContainer
            animation={{
              mode: ["clipPop", "fadeIn"],
              transition: "smoothFast",
              duration: 2,
            }}
            elementType="div"
            controller={{
              trigger: isHovered,
            }}
            className="object-cover text-white size-full z-20 absolute top-0 left-0 bg-black/25 grid place-items-center-safe rounded-lg backdrop-blur-md"
          >
            <MotionContainer
              animation={{
                mode: "scaleZoomIn",
                transition: "gentle",
                duration: 0.88,
              }}
              controller={{
                trigger: isHovered,
              }}
              elementType="div"
            >
              <Expand className="md:size-10 size-7" />
            </MotionContainer>
            <span className="sr-only">Zoom in</span>
          </MotionContainer>
          <LqipImage
            loading="lazy"
            alt={getImgAltName(img)}
            src={img}
            fill
            className="object-cover rounded-lg z-0"
          />
        </AspectRatio>
      </MotionContainer>
    </Trigger>
  );
};
