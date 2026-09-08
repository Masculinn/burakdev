import type { ReactNode } from "react";
import { CookieContext } from "../contexts";
import { useCookieStates } from "../use-cookie";

export default function CookieProvider({ children }: { children: ReactNode }) {
  const value = useCookieStates();
  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}
