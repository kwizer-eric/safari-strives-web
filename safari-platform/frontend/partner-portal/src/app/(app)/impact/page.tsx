"use client";

import { useEffect, useState } from "react";
import type { PartnerProject } from "@safari/shared";
import { Alert, PageHeader, StatCard } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatCurrency } from "@safari/shared";

export default function ImpactPage() {
  const { api } = useAuth();
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.partnerProjects
      .listMine()
      .then((res) => setProjects(res.projects))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const totalFunded = projects.reduce((s, p) => s + p.amountFunded, 0);
  const withReports = projects.filter((p) => !!p.reportUrl).length;

  return (
    <div>
      <PageHeader
        title="Impact"
        description="Portfolio-wide activity from your sponsorship."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total funded"
          value={formatCurrency(totalFunded)}
          hint="Across all sponsored ventures"
        />
        <StatCard label="Ventures" value={projects.length} />
        <StatCard
          label="Reports available"
          value={`${withReports} / ${projects.length}`}
        />
      </div>

      <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          What&apos;s next
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Program team publishes quarterly narrative reports.</li>
          <li>You&apos;ll receive metrics on jobs, revenue, and ownership.</li>
          <li>Site visits can be scheduled with your program lead.</li>
        </ul>
      </div>
    </div>
  );
}
