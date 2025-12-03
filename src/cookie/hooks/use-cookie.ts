import { useContext } from "react";
import { CookieContext } from "../contexts";

export function useCookie() {
  const ctx = useContext(CookieContext);
  if (!ctx)
    throw new Error("useCookieConsent must be used within <CookieProvider>");
  return ctx;
}
