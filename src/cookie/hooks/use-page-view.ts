import { isProd } from "@/lib/env";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/router";
import { useEffect, useEffectEvent, useRef } from "react";
import { useCookie } from "./use-cookie";

const _isProd = isProd();

export const usePageView = () => {
  const hasSentInit = useRef<boolean>(false);

  const { consent } = useCookie();
  const router = useRouter();

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

  useEffect(() => {
    if (!_isProd || !consent?.analytics) return;

    if (!hasSentInit.current) {
      const url = window.location.pathname;
      handleRouteChange(url);

      hasSentInit.current = true;
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [consent, router.events]);

  return hasSentInit;
};
