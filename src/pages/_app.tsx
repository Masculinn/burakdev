import type { ThemeType } from "@/interfaces";
import AppProvider from "@/providers/app-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";

function syncThemeFromStorage() {
  if (typeof window === "undefined") return;

  let t: ThemeType | null = null;

  try {
    const raw = window.localStorage.getItem("theme");
    if (raw) t = raw as ThemeType;
  } catch (e) {
    console.error(`Error reading localStorage on syncThemeFromStorage: ${e}`);
  }

  if (!t && typeof window.__theme !== "undefined") t = window.__theme ?? null;

  if (!t)
    t =
      (process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeType) ??
      ("light" as ThemeType);

  if (window.__setTheme) {
    window.__setTheme(t);
  } else {
    document.documentElement.classList.toggle("dark", t === "dark");
    window.__theme = t;
    window.dispatchEvent(new CustomEvent("theme-change", { detail: t }));
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    syncThemeFromStorage();
    Router.events.on("routeChangeComplete", syncThemeFromStorage);
    return () => Router.events.off("routeChangeComplete", syncThemeFromStorage);
  }, []);

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
