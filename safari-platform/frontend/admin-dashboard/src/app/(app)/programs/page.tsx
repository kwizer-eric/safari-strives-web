"use client";

import { useEffect, useState } from "react";
import type { Program } from "@safari/shared";
import { Alert, PageHeader, Table, type TableColumn } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatDate } from "@safari/shared";

export default function ProgramsPage() {
  const { api } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.programs
      .list()
      .then((res) => setPrograms(res.programs))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const columns: TableColumn<Program>[] = [
    {
      key: "title",
      header: "Program",
      render: (p) => (
        <div>
          <p className="font-semibold text-foreground">{p.title}</p>
          <p className="text-xs text-muted">{p.summary}</p>
        </div>
      ),
    },
    { key: "cohort", header: "Cohort", render: (p) => p.cohort },
    {
      key: "seats",
      header: "Seats",
      render: (p) => `${p.seatsRemaining} / ${p.seatsTotal}`,
    },
    {
      key: "starts",
      header: "Starts",
      render: (p) => formatDate(p.startsAt),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Cohorts, seat availability, and dates."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <Table
        columns={columns}
        rows={programs}
        getRowKey={(p) => p.id}
        emptyMessage="No programs defined."
      />
    </div>
  );
}
