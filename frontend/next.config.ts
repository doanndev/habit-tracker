import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static optimization for all pages since this app uses client-side state
  output: 'standalone',
  trailingSlash: false,
  // Disable static generation
  experimental: {
    // This will make all pages dynamic
  },
};

export default nextConfig;
