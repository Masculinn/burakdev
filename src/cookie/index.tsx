import { CookieAnalytics, CookieBanner, CookiePreferences } from "./components";
import CookieProvider from "./providers";

export { openCookiePreferences } from "./lib";

export default function Cookie() {
  return (
    <CookieProvider>
      <CookieBanner />
      <CookiePreferences />
      <CookieAnalytics />
    </CookieProvider>
  );
}
