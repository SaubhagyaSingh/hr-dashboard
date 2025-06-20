import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
