import { type Context, createContext } from "react";
import type { CookieContextValue } from "../types";

export const CookieContext = createContext<CookieContextValue | undefined>(
  undefined,
) as Context<CookieContextValue>;
