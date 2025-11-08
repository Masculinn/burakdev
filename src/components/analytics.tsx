import { isProd } from "@/lib/env";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Analytics() {
  const router = useRouter();
  const prod = isProd();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      try {
        sendGAEvent("page_view", { page_path: url });
      } catch {
        if (typeof window !== "undefined" && (window as unknown as any).gtag) {
          (window as unknown as any).gtag("event", "page_view", {
            page_path: url,
          });
        }
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  if (!prod) return null;
  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />;
}
