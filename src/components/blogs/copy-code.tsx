import MotionContainer from "@/motion/motion-container";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import type { VariantProps } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, type buttonVariants } from "../ui/button";

interface CopyCodeButtonProps {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  data: string;
}

export const CopyCode: FC<CopyCodeButtonProps> = ({
  className,
  variant,
  data,
}) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    if (copied) return;
    copyToClipboard(data);
    setCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  }, [copyToClipboard, data, copied]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const Icon = useMemo(() => (copied ? Check : Copy), [copied]);

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      aria-label="Copy code"
    >
      <MotionContainer
        animation={{
          mode: ["fadeIn", "filterBlurIn"],
          transition: "gentle",
          delay: !copied ? 0 : 0.33,
        }}
        controller={{
          trigger: !copied,
        }}
        elementType="div"
      >
        <Icon className="size-5" />
      </MotionContainer>
    </Button>
  );
};
