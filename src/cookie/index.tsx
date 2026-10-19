import { CookieAnalytics, CookieBanner, CookiePreferences } from "./components";
import CookieProvider from "./providers";
export default function Cookie() {
  return (
    <CookieProvider>
      <CookieBanner />
      <CookiePreferences />
      <CookieAnalytics />
    </CookieProvider>
  );
}
