import { isProd as checkIsProd } from "@/lib/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent, usePageView } from "../hooks";

const isProd = checkIsProd();

export function CookieAnalytics() {
  usePageView(isProd);
  useConsent(isProd);

  if (!isProd) return null;
  console.info("Google Analytics loaded on 'CookieAnalytics'");
  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />;
}
