"use client";

import { useEffect, useState } from "react";
import type { PartnerProject } from "@safari/shared";
import { Alert, Card, PageHeader } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatCurrency, formatDate } from "@safari/shared";

export default function ProjectsPage() {
  const { api } = useAuth();
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.partnerProjects
      .listMine()
      .then((res) => setProjects(res.projects))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  return (
    <div>
      <PageHeader
        title="Sponsored projects"
        description="Ventures you're currently funding."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">
              No sponsored projects on file yet.
            </p>
          </Card>
        ) : (
          projects.map((p) => (
            <Card key={p.id} as="article">
              <h2 className="mb-1 text-lg font-semibold text-foreground">
                {p.ventureName}
              </h2>
              <p className="mb-4 text-sm text-muted">
                Last updated {formatDate(p.updatedAt)}
              </p>
              <div className="mb-4 rounded-lg bg-cream p-4">
                <p className="text-xs uppercase tracking-wide text-muted">
                  Funded to date
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(p.amountFunded)}
                </p>
              </div>
              {p.reportUrl ? (
                <a
                  href={p.reportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  View latest report
                </a>
              ) : (
                <p className="text-sm text-muted">
                  Report pending — check back soon.
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
