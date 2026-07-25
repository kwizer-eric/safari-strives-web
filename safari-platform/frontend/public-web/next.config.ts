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
      // Cloudflare R2 public buckets (pub-*.r2.dev) and custom domains
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },
});

export default nextConfig;
