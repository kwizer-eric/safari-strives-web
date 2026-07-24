"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, PageHeader } from "@safari/ui";
import { listAdminCmsCollections, listAdminCmsPages } from "@/lib/cms";
import type { Venture, VenturesPagePayload } from "@/types/content";

export default function AdminVenturesPage() {
  const { token } = useAuth();
  const [page, setPage] = useState<VenturesPagePayload | null>(null);
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [pages, collections] = await Promise.all([
          listAdminCmsPages(token),
          listAdminCmsCollections(token),
        ]);
        const venturesPage = pages.find((item) => item.slug === "ventures");
        setPage((venturesPage?.payload as VenturesPagePayload) ?? null);
        const venturesCol = collections.find((c) => c.key === "ventures");
        setVentures(
          ((venturesCol?.payload as { items?: Venture[] })?.items ?? []),
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [token]);

  return (
    <div>
      <PageHeader
        title="Ventures"
        description="Ventures page and venturist list from the CMS."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="space-y-8">
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Page hero</h2>
            <p className="text-sm text-muted">{page?.headline || "—"}</p>
            <p className="mt-2 text-sm text-muted">
              Video: {page?.heroVideo || "—"}
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Venturists ({ventures.length})
            </h2>
            <ul className="space-y-2 text-sm">
              {ventures.map((venture) => (
                <li key={venture.id}>
                  <span className="font-medium">{venture.ventureName}</span>
                  <span className="text-muted">
                    {" "}
                    — {venture.founder} · {venture.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
