import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  compiler: {
    removeConsole: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
