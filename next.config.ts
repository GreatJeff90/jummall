import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jummall-api-1010705002271.europe-west2.run.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
