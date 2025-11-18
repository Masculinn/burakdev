import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  bundlePagesRouterDependencies: true,
  devIndicators: false,
};

export default nextConfig;
