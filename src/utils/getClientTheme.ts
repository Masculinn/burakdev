import type { ThemeType } from "@/interfaces";

export default function getClientTheme(): ThemeType {
  if (typeof window === "undefined")
    return process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeType;

  try {
    const ls = window.localStorage.getItem("theme") as ThemeType | null;
    if (ls) return ls;
  } catch (e) {
    console.error(`Error reading localStorage on getClientTheme: ${e}`);
  }

  if (window.__theme) return window.__theme as ThemeType;

  const m = document.cookie.match("(?:^|; )theme=([^;]+)");
  if (m) return decodeURIComponent(m[1]) as ThemeType;

  return (process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeType) ?? "light";
}
