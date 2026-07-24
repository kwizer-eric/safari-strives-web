"use client";

import { useEffect, useState } from "react";
import { DEFAULT_BACKEND_URL } from "@safari/shared";
import { Alert, Badge, PageHeader, Table, type TableColumn } from "@safari/ui";
import { useAuth } from "@safari/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_BACKEND_URL}/api/v1`;

type ProgramPageSummary = {
  id: number;
  slug: string;
  is_published: boolean;
  hero_title: string;
};

export default function ProgramsPage() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState<ProgramPageSummary[]>([]);
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
        // Admin list includes drafts; public /pages is published-only.
        const res = await fetch(`${API_URL}/admin/pages`, {
          cache: "no-store",
          headers: { authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error(`Failed to load programs (${res.status})`);
        }
        const data = (await res.json()) as ProgramPageSummary[];
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [token]);

  const columns: TableColumn<ProgramPageSummary>[] = [
    {
      key: "title",
      header: "Program",
      render: (p) => (
        <div>
          <p className="font-semibold text-foreground">{p.hero_title}</p>
          <p className="text-xs text-muted">/{p.slug}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <Badge tone={p.is_published ? "success" : "warning"}>
          {p.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Program pages from the CMS (Venture Accelerator, Green Lab, The Hub)."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading ? (
        <p className="text-sm text-muted">Loading programs…</p>
      ) : (
        <Table
          columns={columns}
          rows={programs}
          getRowKey={(p) => String(p.id)}
          emptyMessage="No program pages yet. Seed with: python -m scripts.seed_program_pages"
        />
      )}
    </div>
  );
}
