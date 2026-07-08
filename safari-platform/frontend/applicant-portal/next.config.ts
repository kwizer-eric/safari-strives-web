import type { NextConfig } from "next";
import path from "node:path";

const monorepoRoot = path.resolve(__dirname, "../..");

const nextConfig: NextConfig = {
  turbopack: {
    root: monorepoRoot,
  },
  transpilePackages: [
    "@safari/ui",
    "@safari/shared",
    "@safari/auth",
    "@safari/api-client",
  ],
};

export default nextConfig;
