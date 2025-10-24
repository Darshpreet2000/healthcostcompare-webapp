import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // This is for Turbopack, if you're using it.
    // Remove if not using Turbopack or if it causes issues.
    // turbopack: {
    //   root: '/Users/darshpreetsingh/workplace/medicalcostcompare/medicompare-ai',
    // },
  },
};

export default nextConfig;
