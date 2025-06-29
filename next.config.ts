import type { NextConfig } from "next";

const withTm = require("next-transpile-modules")([
  "lucide-react",
  "react-syntax-highlighter",
]);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withTm({
  output: "export",
  transpilePackages: ["next-mdx-remote"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ytpmpkgcjlcdidphswzv.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  bundlePagesRouterDependencies: true,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "justd-icons"],
  },
});

export default withBundleAnalyzer(nextConfig);
