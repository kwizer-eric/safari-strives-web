import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@safari/ui",
    "@safari/shared",
    "@safari/auth",
    "@safari/api-client",
  ],
};

export default nextConfig;
