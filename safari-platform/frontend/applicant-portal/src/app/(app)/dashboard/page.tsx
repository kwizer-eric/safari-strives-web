"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Application, ApplicationStatus } from "@safari/shared";
import {
  Alert,
  Badge,
  Button,
  Card,
  Input,
  PageHeader,
  TextArea,
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

export default function DashboardPage() {
  const { api } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ventureName, setVentureName] = useState("");
  const [ventureSummary, setVentureSummary] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await api.applications.listMine();
      setApps(res.applications);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    load();
  }, [api]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.applications.create({ ventureName, ventureSummary });
      setVentureName("");
      setVentureSummary("");
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function submit(id: string) {
    try {
      await api.applications.submit(id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div>
      <PageHeader
        title="My applications"
        description="Track the status of ventures you've submitted."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          {apps.length === 0 ? (
            <Card>
              <p className="text-sm text-muted">
                No applications yet. Start one on the right.
              </p>
            </Card>
          ) : (
            apps.map((a) => (
              <Card key={a.id} as="article">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    {a.ventureName}
                  </h2>
                  <Badge tone={toneByStatus[a.status]}>{a.status}</Badge>
                </div>
                <p className="mb-4 text-sm text-muted">{a.ventureSummary}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">
                    {a.submittedAt
                      ? `Submitted ${formatDate(a.submittedAt)}`
                      : `Created ${formatDate(a.createdAt)}`}
                  </p>
                  {a.status === "draft" && (
                    <Button size="sm" onClick={() => submit(a.id)}>
                      Submit for review
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Start a new venture
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <Input
              label="Venture name"
              value={ventureName}
              onChange={(e) => setVentureName(e.target.value)}
              required
              minLength={2}
            />
            <TextArea
              label="Short summary"
              value={ventureSummary}
              onChange={(e) => setVentureSummary(e.target.value)}
              required
              minLength={10}
              hint="What are you building and who is it for?"
            />
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save as draft"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
