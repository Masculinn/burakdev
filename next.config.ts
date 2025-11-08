import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
  // analyzerMode: "static" | "json",
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  bundlePagesRouterDependencies: true,
  devIndicators: false,
};

export default withBundleAnalyzer(nextConfig);
