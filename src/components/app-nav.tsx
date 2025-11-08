import { cn } from "@/lib/utils";
import { useWindowScroll } from "@uidotdev/usehooks";
import { memo, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 5;

function AppNav({ children }: { children: React.ReactNode }) {
  const [{ y }] = useWindowScroll();

  const [visible, setVisible] = useState<boolean>(true);
  const scrollRef = useRef<number | null>(y);

  useEffect(() => {
    if (y === null || y < 0) return;
    if (scrollRef.current === null) {
      scrollRef.current = y;
      return;
    }

    const d = y - scrollRef.current;
    if (Math.abs(d) < SCROLL_THRESHOLD) {
      scrollRef.current = y;
      return;
    }

    if (d > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    scrollRef.current = y;
  }, [y]);

  return (
    <header
      className={cn(
        "flex md:h-20 h-16 sticky top-0 md:z-0 z-50 justify-between w-full flex-row items-center group-has-data-[collapsible=icon]/sidebar-wrapper:h-20 md:backdrop-blur-none backdrop-blur-md transition-transform duration-500 ease-in-out",
        { "-translate-y-full": !visible },
      )}
    >
      {children}
    </header>
  );
}

export default memo(AppNav);
