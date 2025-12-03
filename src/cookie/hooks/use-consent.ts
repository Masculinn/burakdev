import { useEffect } from "react";
import { useCookie } from "./use-cookie";

export const useConsent = (isProd: boolean) => {
  const { consent } = useCookie();

  useEffect(() => {
    if (!consent || !consent.analytics || !isProd) return;
    if ((window as Window).gtag) {
      try {
        (window as Window).gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } catch {}
    }
  }, [consent, isProd]);
};
