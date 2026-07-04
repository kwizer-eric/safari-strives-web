"use client";

import { useEffect, useMemo, useState } from "react";
import type { MentorSession } from "@safari/shared";
import { Alert, Card, PageHeader } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { initials } from "@safari/shared";

type MenteeSummary = {
  id: string;
  name: string;
  sessions: number;
  upcoming: number;
};

export default function MenteesPage() {
  const { api } = useAuth();
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.sessions
      .listMine()
      .then((res) => setSessions(res.sessions))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const mentees = useMemo<MenteeSummary[]>(() => {
    const map = new Map<string, MenteeSummary>();
    sessions.forEach((s) => {
      const existing = map.get(s.menteeId) ?? {
        id: s.menteeId,
        name: s.menteeName,
        sessions: 0,
        upcoming: 0,
      };
      existing.sessions += 1;
      if (s.status === "upcoming") existing.upcoming += 1;
      map.set(s.menteeId, existing);
    });
    return Array.from(map.values());
  }, [sessions]);

  return (
    <div>
      <PageHeader
        title="Mentees"
        description="People you're actively coaching."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mentees.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">
              You do not have any mentees yet.
            </p>
          </Card>
        ) : (
          mentees.map((m) => (
            <Card key={m.id} as="article">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-white">
                  {initials(m.name)}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted">
                    {m.sessions} sessions · {m.upcoming} upcoming
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
