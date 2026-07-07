"use client";

import { useEffect, useState } from "react";
import type { Program } from "@safari/shared";
import { Alert, Card, PageHeader } from "@safari/ui";
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

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Cohorts you can apply to right now."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((program) => (
          <Card key={program.id} as="article">
            <h2 className="mb-1 text-lg font-semibold text-foreground">
              {program.title}
            </h2>
            <p className="mb-4 text-sm text-muted">{program.summary}</p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">
                  Cohort
                </p>
                <p className="font-semibold text-foreground">
                  {program.cohort}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">
                  Seats
                </p>
                <p className="font-semibold text-foreground">
                  {program.seatsRemaining} / {program.seatsTotal}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">
                  Starts
                </p>
                <p className="font-semibold text-foreground">
                  {formatDate(program.startsAt)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
