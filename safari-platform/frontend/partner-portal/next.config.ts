import { createNextConfig } from "../create-next-config";

export default createNextConfig(__dirname, {
  transpilePackages: [
    "@safari/ui",
    "@safari/shared",
    "@safari/auth",
    "@safari/api-client",
  ],
});
