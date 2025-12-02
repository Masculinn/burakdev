import { useContext } from "react";
import { CookieContext } from "../context";

export function useCookieConsent() {
  const ctx = useContext(CookieContext);
  if (!ctx)
    throw new Error("useCookieConsent must be used within CookieProvider");
  return ctx;
}
