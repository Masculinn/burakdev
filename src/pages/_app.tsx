import type { ThemeType } from "@/interfaces";
import { navigateWithTransition } from "@/lib/view-transition";
import AppProvider from "@/providers/app-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

const isThemeType = (value: string): value is ThemeType =>
  value === "light" || value === "dark";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== "theme" || !event.newValue) return;
      if (!isThemeType(event.newValue)) return;
      window.__setTheme?.(event.newValue);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      void navigateWithTransition(
        () => router.prefetch(url, as),
        () => router.replace(url, as, options),
      );
      return false;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <AppProvider>
      <Component {...pageProps} />
      {/* <Cookie /> */}
    </AppProvider>
  );
}
