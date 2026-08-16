"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, PageHeader, Table, type TableColumn } from "@safari/ui";
import { getApiBaseUrl } from "@/lib/api-base-url";

type NewsletterSubscriber = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

function formatWhen(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleString();
}

export default function AdminNewsletterPage() {
  const { token } = useAuth();
  const [rows, setRows] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setError("Sign in required.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${getApiBaseUrl()}/admin/submissions/newsletter`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `Failed to load (${res.status})`);
      }
      const data = (await res.json()) as NewsletterSubscriber[];
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const columns: TableColumn<NewsletterSubscriber>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => <span className="font-semibold">{row.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      render: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-accent hover:underline"
        >
          {row.email}
        </a>
      ),
    },
    {
      key: "created_at",
      header: "Signed up",
      render: (row) => (
        <span className="text-muted">{formatWhen(row.created_at)}</span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Newsletter"
        description="Homepage newsletter signups stored in newsletter_subscribers."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">{rows.length} subscribers</p>
          <Table
            columns={columns}
            rows={rows}
            getRowKey={(row) => String(row.id)}
            emptyMessage="No newsletter signups yet."
          />
        </>
      )}
    </div>
  );
}
