"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import type { Application, ApplicationStatus } from "@safari/shared";
import { Alert, Badge, Button, Card, PageHeader, StatCard } from "@safari/ui";
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

const statusLabel: Record<ApplicationStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In review",
  accepted: "Accepted",
  rejected: "Not this time",
};

export default function DashboardPage() {
  const { api, user } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  async function submit(id: string) {
    try {
      await api.applications.submit(id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const drafts = apps.filter((a) => a.status === "draft").length;
  const active = apps.filter(
    (a) => a.status === "submitted" || a.status === "in_review",
  ).length;
  const accepted = apps.filter((a) => a.status === "accepted").length;

  return (
    <div>
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description="Track your applications, save drafts, and start a new venture anytime."
        actions={
          <Button href="/apply" showArrow>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New application
          </Button>
        }
      />

      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Drafts" value={drafts} />
        <StatCard label="In review" value={active} />
        <StatCard label="Accepted" value={accepted} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Your applications
        </h2>
        {apps.length > 0 && (
          <Link
            href="/apply"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Start new
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      {apps.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Plus className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              No applications yet
            </h3>
            <p className="mt-1 max-w-md text-sm text-muted">
              Tell us about the business you already run. It takes about five
              minutes and you can save as a draft.
            </p>
          </div>
          <Button href="/apply" showArrow>
            Start a new application
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {apps.map((a) => (
            <Card key={a.id} as="article" className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {a.ventureName}
                    </h3>
                    <Badge tone={toneByStatus[a.status]}>
                      {statusLabel[a.status]}
                    </Badge>
                    {a.category && (
                      <Badge tone="neutral">
                        {a.category.replace("_", " & ")}
                      </Badge>
                    )}
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-muted">
                    {a.ventureSummary}
                  </p>
                  <p className="text-xs text-muted">
                    {a.submittedAt
                      ? `Submitted ${formatDate(a.submittedAt)}`
                      : `Created ${formatDate(a.createdAt)}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {a.status === "draft" && (
                    <Button size="sm" onClick={() => submit(a.id)}>
                      Submit for review
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
