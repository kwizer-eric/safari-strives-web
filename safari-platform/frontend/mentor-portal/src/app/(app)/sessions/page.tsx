"use client";

import { useEffect, useState } from "react";
import type { MentorSession } from "@safari/shared";
import { Alert, Badge, PageHeader, Table, type TableColumn } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatDate } from "@safari/shared";

const toneByStatus = {
  upcoming: "info",
  completed: "success",
  cancelled: "danger",
} as const;

export default function SessionsPage() {
  const { api } = useAuth();
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.sessions
      .listMine()
      .then((res) => setSessions(res.sessions))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const columns: TableColumn<MentorSession>[] = [
    {
      key: "mentee",
      header: "Mentee",
      render: (s) => (
        <span className="font-semibold text-foreground">{s.menteeName}</span>
      ),
    },
    {
      key: "when",
      header: "When",
      render: (s) => formatDate(s.scheduledAt),
    },
    {
      key: "duration",
      header: "Duration",
      render: (s) => `${s.durationMinutes} min`,
    },
    {
      key: "status",
      header: "Status",
      render: (s) => <Badge tone={toneByStatus[s.status]}>{s.status}</Badge>,
    },
  ];

  const upcoming = sessions.filter((s) => s.status === "upcoming");
  const past = sessions.filter((s) => s.status !== "upcoming");

  return (
    <div>
      <PageHeader
        title="Sessions"
        description="Your upcoming and past mentor sessions."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
          Upcoming
        </h2>
        <Table
          columns={columns}
          rows={upcoming}
          getRowKey={(s) => s.id}
          emptyMessage="No upcoming sessions."
        />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
          Past
        </h2>
        <Table
          columns={columns}
          rows={past}
          getRowKey={(s) => s.id}
          emptyMessage="No past sessions yet."
        />
      </section>
    </div>
  );
}
