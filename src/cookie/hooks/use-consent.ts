import { isProd } from "@/lib/env";
import { useEffect } from "react";
import { useCookie } from "./use-cookie";

const _isProd = isProd();

export const useConsent = () => {
  const { consent } = useCookie();

  useEffect(() => {
    if (!consent?.analytics || !_isProd) return;
    if ((window as Window).gtag) {
      try {
        (window as Window).gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } catch {}
    }
  }, [consent, _isProd]);
};
