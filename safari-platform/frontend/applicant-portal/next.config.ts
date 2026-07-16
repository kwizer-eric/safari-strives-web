import { createNextConfig } from "../create-next-config";
import { ZONE_BASE_PATHS } from "../zone-rewrites";

export default createNextConfig(__dirname, {
  basePath: ZONE_BASE_PATHS.applicant,
  transpilePackages: [
    "@safari/ui",
    "@safari/shared",
    "@safari/auth",
    "@safari/api-client",
  ],
});
