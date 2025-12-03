import { useMemo } from "react";
import { CookieContext } from "../contexts";
import { useCookieStates } from "../hooks";
import type { CookieContextValue } from "../types";

export default function CookieProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const states = useCookieStates();
  const ctxValue: CookieContextValue = useMemo(() => states, [states]);

  return (
    <CookieContext.Provider value={ctxValue}>{children}</CookieContext.Provider>
  );
}
