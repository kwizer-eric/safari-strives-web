import { DEFAULT_BACKEND_URL } from "@safari/shared";

/**
 * Known Railway backend used when production env vars were not set at build time.
 * Override with API_URL / NEXT_PUBLIC_API_URL if the domain changes.
 */
const PRODUCTION_API_FALLBACK =
  "https://brilliant-optimism-production-7a05.up.railway.app/api/v1";

/**
 * FastAPI `/api/v1` base URL.
 *
 * Prefer runtime `API_URL`, then `NEXT_PUBLIC_API_URL`, then:
 * - production → Railway backend fallback (never localhost)
 * - development → localhost
 */
export function getApiBaseUrl(): string {
  const fromRuntime = process.env.API_URL?.trim();
  const fromPublic = process.env.NEXT_PUBLIC_API_URL?.trim();
  const configured = (fromRuntime || fromPublic || "").replace(/\/$/, "");
  const isProd = process.env.NODE_ENV === "production";

  if (configured && !/localhost|127\.0\.0\.1/i.test(configured)) {
    return configured;
  }

  if (isProd) {
    if (configured) {
      console.error(
        "[api] Refusing localhost API URL in production; using Railway backend fallback. " +
          "Set API_URL and NEXT_PUBLIC_API_URL to your backend /api/v1.",
      );
    } else {
      console.warn(
        "[api] API_URL / NEXT_PUBLIC_API_URL unset in production; using Railway backend fallback.",
      );
    }
    return PRODUCTION_API_FALLBACK;
  }

  return (configured || `${DEFAULT_BACKEND_URL}/api/v1`).replace(/\/$/, "");
}
