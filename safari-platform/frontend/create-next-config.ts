import type { NextConfig } from "next";
import path from "node:path";

type CreateNextConfigOptions = {
  transpilePackages: string[];
  images?: NextConfig["images"];
};

export function createNextConfig(
  appDir: string,
  options: CreateNextConfigOptions,
): NextConfig {
  const monorepoRoot = path.resolve(appDir, "..");

  return {
    outputFileTracingRoot: monorepoRoot,
    turbopack: {
      root: monorepoRoot,
    },
    transpilePackages: options.transpilePackages,
    images: options.images,
  };
}
