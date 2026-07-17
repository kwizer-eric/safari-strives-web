"use client";

import { useEffect, useState } from "react";
import type { Application, ApplicationStatus } from "@safari/shared";
import {
  Alert,
  Badge,
  Button,
  PageHeader,
  Table,
  type TableColumn,
} from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatDate } from "@safari/shared";

const toneByStatus: Record<
  ApplicationStatus,
  "neutral" | "info" | "success" | "warning" | "danger"
> = {
  draft: "neutral",
  submitted: "info",
  in_review: "warning",
  accepted: "success",
  rejected: "danger",
};

export default function ApplicationsPage() {
  const { api } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await api.applications.listAll();
      setApps(res.applications);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    load();
  }, [api]);

  async function transition(id: string, status: ApplicationStatus) {
    try {
      await api.applications.updateStatus(id, status);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const columns: TableColumn<Application>[] = [
    {
      key: "venture",
      header: "Venture",
      render: (a) => (
        <div>
          <p className="font-semibold text-foreground">{a.ventureName}</p>
          <p className="text-xs text-muted line-clamp-2">{a.ventureSummary}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => <Badge tone={toneByStatus[a.status]}>{a.status}</Badge>,
    },
    {
      key: "submitted",
      header: "Submitted",
      render: (a) => (
        <span className="text-sm text-muted">
          {a.submittedAt ? formatDate(a.submittedAt) : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (a) => (
        <div className="flex justify-end gap-2">
          {a.status !== "in_review" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => transition(a.id, "in_review")}
            >
              Review
            </Button>
          )}
          {a.status !== "accepted" && (
            <Button size="sm" onClick={() => transition(a.id, "accepted")}>
              Accept
            </Button>
          )}
          {a.status !== "rejected" && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => transition(a.id, "rejected")}
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Move applications through the review pipeline."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <Table
        columns={columns}
        rows={apps}
        getRowKey={(a) => a.id}
        emptyMessage="No applications yet."
      />
    </div>
  );
}
