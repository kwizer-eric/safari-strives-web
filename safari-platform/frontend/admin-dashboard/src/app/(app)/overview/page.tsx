"use client";

import { useEffect, useState } from "react";
import type { Application, Program, User } from "@safari/shared";
import { PageHeader, StatCard, Alert } from "@safari/ui";
import { useAuth } from "@safari/auth";

export default function OverviewPage() {
  const { api } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [apps, progs, us] = await Promise.all([
          api.applications.listAll(),
          api.programs.list(),
          api.users.list(),
        ]);
        setApplications(apps.applications);
        setPrograms(progs.programs);
        setUsers(us.users);
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  }, [api]);

  const submitted = applications.filter((a) => a.status !== "draft").length;
  const seats = programs.reduce((s, p) => s + p.seatsRemaining, 0);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Program-wide activity at a glance."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={applications.length} />
        <StatCard
          label="Submitted"
          value={submitted}
          hint={`${applications.length - submitted} still in draft`}
        />
        <StatCard label="Programs" value={programs.length} />
        <StatCard label="Open seats" value={seats} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Team & members
          </h2>
          <p className="text-sm text-muted">
            {users.length} users total across{" "}
            {new Set(users.map((u) => u.role)).size} roles.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Next actions
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Review pending applications.</li>
            <li>Publish updated program cohort dates.</li>
            <li>Follow up with partners on outstanding reports.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
