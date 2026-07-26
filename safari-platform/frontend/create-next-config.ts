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
    // Trace files from the frontend workspace root so @safari/* packages
    // are included in the Vercel serverless bundle.
    outputFileTracingRoot: monorepoRoot,
    turbopack: {
      root: monorepoRoot,
    },
    transpilePackages: options.transpilePackages,
    images: options.images,
  };
}
