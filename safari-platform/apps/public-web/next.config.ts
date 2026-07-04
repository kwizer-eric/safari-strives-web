import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@safari/ui", "@safari/shared"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "safaristrives.org" },
    ],
  },
};

export default nextConfig;
