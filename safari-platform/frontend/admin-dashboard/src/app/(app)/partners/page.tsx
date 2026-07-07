"use client";

import { useEffect, useState } from "react";
import type { PartnerProject } from "@safari/shared";
import { Alert, PageHeader, Table, type TableColumn } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatCurrency, formatDate } from "@safari/shared";

export default function PartnersPage() {
  const { api } = useAuth();
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.partnerProjects
      .listAll()
      .then((res) => setProjects(res.projects))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const columns: TableColumn<PartnerProject>[] = [
    {
      key: "venture",
      header: "Venture",
      render: (p) => (
        <span className="font-semibold text-foreground">{p.ventureName}</span>
      ),
    },
    {
      key: "amount",
      header: "Funded",
      render: (p) => formatCurrency(p.amountFunded),
    },
    {
      key: "report",
      header: "Latest report",
      render: (p) =>
        p.reportUrl ? (
          <a
            href={p.reportUrl}
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            View report
          </a>
        ) : (
          <span className="text-muted">Pending</span>
        ),
    },
    {
      key: "updated",
      header: "Updated",
      render: (p) => formatDate(p.updatedAt),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Partner projects"
        description="Sponsors and their funded ventures."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <Table columns={columns} rows={projects} getRowKey={(p) => p.id} />
    </div>
  );
}
