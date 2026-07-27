import { DEFAULT_BACKEND_URL } from "@safari/shared";

/**
 * FastAPI `/api/v1` base URL.
 *
 * Prefer runtime `API_URL` (Railway can change without rebuilding) then
 * `NEXT_PUBLIC_API_URL` (baked for browser/client), then local default.
 */
export function getApiBaseUrl(): string {
  const fromRuntime = process.env.API_URL?.trim();
  const fromPublic = process.env.NEXT_PUBLIC_API_URL?.trim();
  const raw = fromRuntime || fromPublic || `${DEFAULT_BACKEND_URL}/api/v1`;
  return raw.replace(/\/$/, "");
}
