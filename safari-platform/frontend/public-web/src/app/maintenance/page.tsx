import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance | Safari Strives",
  description: "Safari Strives is temporarily offline for maintenance. We'll be back shortly.",
};

/**
 * Static maintenance page. Shown for all requests when MAINTENANCE_MODE=true
 * (see src/middleware.ts). Kept dependency-free and simple so it always
 * renders, even if CMS content or other services are unavailable.
 */
export default function MaintenancePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <span className="text-5xl" role="img" aria-label="Wrench">
        🔧
      </span>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Under Maintenance
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        We&apos;re making some improvements behind the scenes. Safari Strives
        will be back online shortly — thanks for your patience.
      </p>
    </main>
  );
}
