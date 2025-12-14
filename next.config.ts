import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  // Compiler optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,

    // Optimize package imports
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "lucide-react",
      "framer-motion",
    ],

    // Static optimization
    optimizeServerReact: true,

    // Memory optimization
    memoryBasedWorkersCount: true,
  },

  // Turbopack configuration (Next.js 16 default)
  // Empty config acknowledges we're using Turbopack
  // Most webpack optimizations are built into Turbopack
  turbopack: {},

  // Production source maps (disable for faster builds, enable for debugging)
  productionBrowserSourceMaps: false,

  // Optimize bundle
  webpack: (config, { isServer, webpack }) => {
    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
      runtimeChunk: isServer ? undefined : "single",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for node_modules
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk for shared code
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Radix UI components in separate chunk
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: "radix",
            chunks: "all",
            priority: 30,
          },
          // React/Redux in separate chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|@reduxjs|react-redux)[\\/]/,
            name: "react-vendor",
            chunks: "all",
            priority: 40,
          },
        },
      },
    };

    // Performance optimizations
    config.performance = {
      hints: process.env.NODE_ENV === "production" ? "warning" : false,
      maxAssetSize: 512000, // 500 KB
      maxEntrypointSize: 512000, // 500 KB
    };

    // Add bundle analyzer in analyze mode
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: true,
        })
      );
    }

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
