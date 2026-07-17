import { createNextConfig } from "../create-next-config";

const nextConfig = createNextConfig(__dirname, {
  transpilePackages: ["@safari/ui", "@safari/shared", "@safari/auth", "@safari/api-client"],
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

export default nextConfig;
