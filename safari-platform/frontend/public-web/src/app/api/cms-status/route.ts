import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api-base-url";

/**
 * Temporary production diagnostic: which API base the server uses, and whether
 * CMS home is reachable. Remove once Railway wiring is confirmed.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const apiBase = getApiBaseUrl();
  const homeUrl = `${apiBase}/cms/pages/home`;
  let homeStatus: number | null = null;
  let homeHeadline: string | null = null;
  let fetchError: string | null = null;

  try {
    const res = await fetch(homeUrl, { cache: "no-store" });
    homeStatus = res.status;
    if (res.ok) {
      const body = (await res.json()) as {
        payload?: { hero?: { headline?: string } };
      };
      homeHeadline = body.payload?.hero?.headline ?? null;
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    apiBase,
    homeUrl,
    homeStatus,
    homeHeadline,
    fetchError,
    nodeEnv: process.env.NODE_ENV,
    hasApiUrlEnv: Boolean(process.env.API_URL?.trim()),
    hasNextPublicApiUrlEnv: Boolean(process.env.NEXT_PUBLIC_API_URL?.trim()),
  });
}
