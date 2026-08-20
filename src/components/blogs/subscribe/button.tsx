import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronRight, Rss } from "lucide-react";

export default function SubscribeButton({
  handleOpen,
  isIcon,
  className,
}: {
  handleOpen: () => void;
  isIcon?: boolean;
  className?: string;
}) {
  const isMobile = useIsMobile();
  if (isIcon) {
    return (
      <Button
        variant="ghost"
        className={cn("rounded-full", className)}
        onClick={handleOpen}
        aria-label="Subscribe button"
      >
        <ChevronRight className="shrink-0 md:size-6" />
      </Button>
    );
  }
  return (
    <Button
      variant="default"
      onClick={handleOpen}
      aria-label="Subscribe button"
      className={className}
    >
      <Rss className="size-4" />
      <span>{isMobile ? "Newsletter" : "Subscribe Newsletter"} </span>
    </Button>
  );
}
