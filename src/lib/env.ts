export const isServer = typeof window === "undefined";

export function isProd(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  if (!isServer) {
    const host = window.location.hostname;
    if (host === process.env.NEXT_PUBLIC_SITE_URL || host !== "localhost")
      return true;
  }
  return false;
}
