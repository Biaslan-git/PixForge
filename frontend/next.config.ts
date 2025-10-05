import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
