import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable server actions since they use experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  webpack: (config) => {
    // Externalize problematic packages that include test files
    config.externals = config.externals || [];

    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // Suppress warnings about missing modules during build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
