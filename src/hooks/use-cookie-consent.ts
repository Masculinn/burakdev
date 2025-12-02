import { CookieContext } from "@/contexts";
import { useContext } from "react";

export function useCookieConsent() {
  const ctx = useContext(CookieContext);
  if (!ctx)
    throw new Error("useCookieConsent must be used within CookieProvider");
  return ctx;
}
