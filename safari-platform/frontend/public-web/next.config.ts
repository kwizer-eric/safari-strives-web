import { createNextConfig } from "../create-next-config";

const nextConfig = createNextConfig(__dirname, {
  transpilePackages: ["@safari/ui", "@safari/shared", "@safari/auth", "@safari/api-client"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "framerusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "www.brookings.edu", pathname: "/**" },
      { protocol: "https", hostname: "safaristrives.org", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      // Cloudinary (images + video posters)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
      // Cloudflare R2
      { protocol: "https", hostname: "*.r2.dev", pathname: "/**" },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
});

export default nextConfig;
