"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Shown when public pages throw (e.g. CMS API unreachable / misconfigured URL).
 * Distinct from not-found.tsx, which covers genuine missing published content.
 *
 * Note: Next.js strips Server Component error.message in production. Digests
 * map to the real message in Railway deploy logs.
 */
export default function PublicError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[public site]", error.message, error.digest);
  }, [error]);

  const rawMessage = error.message || "";
  const isCmsUnreachable =
    /CMS API unreachable|CMS request failed|Failed to fetch page/i.test(
      rawMessage,
    );
  const isProdGeneric =
    /specific message is omitted in production/i.test(rawMessage);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {isCmsUnreachable ? "Content API unreachable" : "Something went wrong"}
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        {isCmsUnreachable
          ? "The marketing site could not load CMS content. Check that API_URL / NEXT_PUBLIC_API_URL points at the live backend /api/v1, then retry."
          : isProdGeneric
            ? "The homepage failed while loading CMS data. On Railway, open the frontend Deploy Logs and search for this digest, or confirm articles/testimonials are published and API_URL is set."
            : "An unexpected error stopped this page from loading."}
      </p>
      <p className="max-w-full break-words rounded-md bg-cream px-3 py-2 font-mono text-xs text-muted">
        {isProdGeneric && error.digest
          ? `digest: ${error.digest}`
          : rawMessage}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/admin/login"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40"
        >
          Admin login
        </Link>
      </div>
    </main>
  );
}
