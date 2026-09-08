import { isProd } from "@/lib/env";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trackPageView, updateAnalyticsConsent } from "../lib/analytics";
import { useCookie } from "../use-cookie";

export function CookieAnalytics() {
  const { consent, ready } = useCookie();
  const router = useRouter();
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
  const enabled = isProd() && /^G-[A-Z0-9]+$/i.test(id);
  const allowed = ready && consent?.analytics === true;
  const [initializedId, setInitializedId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !ready) return;
    updateAnalyticsConsent(id, allowed);
    if (!allowed) return;
    // Queue consent/config before rendering the external script.
    setInitializedId(id);
    if (!router.isReady) return;
    const onRouteChange = (url: string) => trackPageView(id, url);
    onRouteChange(window.location.pathname + window.location.search);
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [allowed, enabled, id, ready, router.events, router.isReady]);

  if (!enabled || !allowed || initializedId !== id) return null;
  return (
    <Script
      id={`cookie-google-analytics-${id}`}
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
      strategy="afterInteractive"
    />
  );
}
