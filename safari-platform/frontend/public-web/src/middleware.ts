import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Global maintenance-mode switch.
 *
 * Set MAINTENANCE_MODE=true (and restart the service — no redeploy needed)
 * to take the site offline. Every request except static assets, the
 * maintenance page itself, and Next.js internals is rewritten to
 * /maintenance so visitors see a friendly "Under Maintenance" page while
 * the app keeps running normally underneath.
 *
 * Set MAINTENANCE_MODE=false (or unset it) to restore normal traffic.
 */
export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets with a file extension (e.g. .svg, .png, .ico, .css, .js)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
