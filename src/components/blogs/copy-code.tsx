import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionContainer } from "@/motion/components/motion-container";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import type { VariantProps } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import { type FC, useEffect, useRef, useState } from "react";
import { Button, type buttonVariants } from "../ui/button";

interface CopyCodeButtonProps {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  data: string;
}

const { animation, elementType } = getAnimation("copyCode");

export const CopyCode: FC<CopyCodeButtonProps> = ({
  className,
  variant,
  data,
}) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleClick() {
    if (copied) return;

    copyToClipboard(data);
    setCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const Icon = copied ? Check : Copy;

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      aria-label="Copy code"
    >
      <MotionContainer
        animation={{
          delay: !copied ? 0 : 0.33,
          ...animation,
        }}
        controller={{
          trigger: !copied,
        }}
        elementType={elementType}
      >
        <Icon className="size-5" />
      </MotionContainer>
    </Button>
  );
};
