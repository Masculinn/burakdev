import { Button } from "@/components/ui/button";
import { ChevronRight, Rss } from "lucide-react";

export default function SubscribeButton({
  handleOpen,
  isIcon,
}: {
  handleOpen: () => void;
  isIcon?: boolean;
}) {
  if (isIcon) {
    return (
      <Button
        variant="ghost"
        className="rounded-full"
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
    >
      <Rss className="size-4" />
      <span>Subscribe Newsletter</span>
    </Button>
  );
}
