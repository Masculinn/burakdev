import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/router";
import { useEffect, useEffectEvent, useRef } from "react";
import { useCookie } from "./use-cookie";

export const usePageView = (isProd: boolean) => {
  const { consent } = useCookie();
  const router = useRouter();
  const hasSentInit = useRef<boolean>(false);

  const handleRouteChange = useEffectEvent((url: string) => {
    try {
      sendGAEvent("page_view", { page_path: url });
    } catch {
      try {
        if ((window as Window).gtag)
          (window as Window).gtag("event", "page_view", { page_path: url });
      } catch {}
    }
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive deps
  useEffect(() => {
    if (!isProd || !consent || !consent.analytics) return;

    if (!hasSentInit.current) {
      const url = window.location.pathname;
      handleRouteChange(url);
      hasSentInit.current = true;
    }

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [isProd, consent, router.events]);

  return hasSentInit;
};
