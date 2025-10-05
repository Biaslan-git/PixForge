import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Configure webpack for better file watching in Docker
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Poll every second
        aggregateTimeout: 300, // Delay before emitting events
      };
    }
    return config;
  },
  async rewrites() {
    return [
      // Add rewrites for API routes if needed
      // Example: rewrite API calls to a backend service
      // {
      //   source: '/api/:path*',
      //   destination: 'http://backend:8000/:path*',
      // },
    ]
  },
};

export default nextConfig;
