import { createNextConfig } from "../create-next-config";
import { zoneRewrites } from "../zone-rewrites";

const nextConfig = createNextConfig(__dirname, {
  transpilePackages: ["@safari/ui", "@safari/shared"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "www.brookings.edu" },
      { protocol: "https", hostname: "safaristrives.org" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
});

export default {
  ...nextConfig,
  async rewrites() {
    return zoneRewrites();
  },
};
