import type { NextConfig } from "next";
import path from "node:path";

type CreateNextConfigOptions = {
  transpilePackages: string[];
  images?: NextConfig["images"];
  basePath?: string;
};

export function createNextConfig(
  appDir: string,
  options: CreateNextConfigOptions,
): NextConfig {
  const monorepoRoot = path.resolve(appDir, "..");

  return {
    ...(options.basePath ? { basePath: options.basePath } : {}),
    turbopack: {
      root: monorepoRoot,
    },
    transpilePackages: options.transpilePackages,
    images: options.images,
  };
}
