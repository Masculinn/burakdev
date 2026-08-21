import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  bundlePagesRouterDependencies: true,
  devIndicators: false,
  reactCompiler: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
  },
  allowedDevOrigins: ["192.168.10.125"],
};

export default nextConfig;
