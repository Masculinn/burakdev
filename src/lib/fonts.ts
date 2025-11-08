import { DM_Sans, Geist_Mono } from "next/font/google";

export const primaryFont = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-primary",
});

export const secondaryFont = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-secondary",
});
