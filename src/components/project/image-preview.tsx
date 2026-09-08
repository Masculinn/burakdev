import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionContainer } from "@/motion/components/motion-container";
import { getImgAlt } from "@/utils/getImgAlt";
import { Expand } from "lucide-react";
import { type FC, useState } from "react";
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
  const handleClick = () => onSelect(img);

  const Trigger = triggerMode === "dialog" ? DialogTrigger : DrawerTrigger;

  return (
    <Trigger onClick={handleClick}>
      <MotionContainer
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(false)}
        controller={{
          trigger: !isHovered,
        }}
        {...getAnimation("imagePreview")}
      >
        <AspectRatio
          ratio={1 / 1}
          className="rounded-md outline-muted outline-1 relative overflow-hidden"
        >
          <MotionContainer
            {...getAnimation("imagePreviewIconWrapper")}
            controller={{
              trigger: isHovered,
            }}
          >
            <MotionContainer
              {...getAnimation("imagePreviewIcon")}
              controller={{
                trigger: isHovered,
              }}
            >
              <Expand className="md:size-10 size-7" />
            </MotionContainer>
            <span className="sr-only">Zoom in</span>
          </MotionContainer>
          <LqipImage
            loading="lazy"
            alt={getImgAlt(img)}
            src={img}
            fill
            className="object-cover rounded-lg z-0"
          />
        </AspectRatio>
      </MotionContainer>
    </Trigger>
  );
};
