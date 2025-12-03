import { useIsClient } from "@uidotdev/usehooks";

import { CookieAnalytics, CookieBanner, CookiePreferences } from "./components";
import CookieProvider from "./providers";

export default function Cookie() {
  const isClient = useIsClient();

  if (!isClient) return null;
  return (
    <CookieProvider>
      <CookieBanner />
      <CookiePreferences />
      <CookieAnalytics />
    </CookieProvider>
  );
}
