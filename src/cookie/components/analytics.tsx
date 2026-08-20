import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent, usePageView } from "../hooks";
import { isProd } from "@/lib/env";

export function CookieAnalytics() {
  if (!isProd()) return;

  usePageView();
  useConsent();

  if (!isProd) return null;
  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />;
}
