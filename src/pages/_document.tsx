import type { ThemeType } from "@/interfaces";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

declare global {
  interface Window {
    __theme?: ThemeType;
    __setTheme?: (theme: ThemeType) => void;
  }
}

export default class MyDocument extends Document {
  render() {
    const themeScript = `
    (function () {
      try {
        var DEFAULT = "${process.env.NEXT_PUBLIC_DEFAULT_THEME || "light"}";

        function readCookieTheme() {
          var m = document.cookie.match('(?:^|; )theme=([^;]+)');
          return m ? decodeURIComponent(m[1]) : null;
        }

        var theme = null;
        try { theme = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
        if (!theme) theme = readCookieTheme();
        if (!theme) theme = DEFAULT;

        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        window.__theme = theme;
        window.__setTheme = function (next) {
          try {
            localStorage.setItem("theme", next);
          } catch (e) {}
          try {
            document.cookie = "theme=" + encodeURIComponent(next) + "; path=/; Max-Age=" + (60 * 60 * 24 * 365);
          } catch (e) {}
          if (next === "dark") document.documentElement.classList.add("dark");
          else document.documentElement.classList.remove("dark");
          window.__theme = next;
          window.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
        };

        window.addEventListener("pageshow", function (event) {
          if (!event.persisted) return;
          var t = null;
          try { t = localStorage.getItem("theme"); } catch (e) {}
          if (!t) t = readCookieTheme();
          if (!t) t = DEFAULT;
          if (t === "dark") document.documentElement.classList.add("dark");
          else document.documentElement.classList.remove("dark");
          window.__theme = t;
          window.dispatchEvent(new CustomEvent("theme-change", { detail: t }));
        });
      } catch (e) {
        console.error(e);
      }
    })();
        `;

    return (
      <Html
        className={`${primaryFont.className} ${secondaryFont.variable}`}
        lang="en"
        data-scroll-behavior="smooth"
      >
        <Head />
        <body>
          <Script
            id="theme_script"
            strategy="beforeInteractive"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: source only internal which makes it safe
            dangerouslySetInnerHTML={{ __html: themeScript }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
