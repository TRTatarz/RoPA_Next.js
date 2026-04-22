import type { NextConfig } from "next";

const isDev = process.env.NODE_PATH === 'development' || process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: isDev 
          ? 'http://127.0.0.1:8000/:path*' 
          : 'https://ropa-backend-production-aaf0.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;