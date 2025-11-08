import type { ThemeType } from "@/interfaces";
import getClientTheme from "@/utils/getClientTheme";
import { useEffect, useState } from "react";

export function useTheme(): ThemeType {
  const [theme, setTheme] = useState<ThemeType>(() => getClientTheme());

  useEffect(() => {
    setTheme(getClientTheme());

    const controller = new AbortController();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = (e.newValue as ThemeType) ?? getClientTheme();
        setTheme(newTheme);
      }
    };

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as ThemeType | undefined;
      setTheme(detail ?? getClientTheme());
    };

    window.addEventListener("storage", onStorage, {
      signal: controller.signal,
    });
    window.addEventListener("theme-change", onCustom as EventListener, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  return theme;
}
