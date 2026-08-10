"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, PageHeader } from "@safari/ui";
import {
  findCmsPageBySlug,
  listAdminCmsPages,
} from "@/lib/cms";
import type {
  AboutPagePayload,
  AboutPerson,
} from "@/types/content";

type Tab = "board" | "team";

// Fetch team members from database endpoint
async function listAdminTeam(token: string): Promise<AboutPerson[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/api/v1/admin/people/team`,
    {
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) return [];
  const members = await res.json();
  return members.map((m: any) => ({
    id: String(m.id),
    name: m.name,
    role: m.title || "",
    bio: m.bio || "",
    location: "",
    image: m.photo_url || "",
    imageAlt: m.name,
    linkedin: m.linkedin_url || "",
    featured: false,
  }));
}

// Fetch board members from database endpoint
async function listAdminBoard(token: string): Promise<AboutPerson[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/api/v1/admin/people/board`,
    {
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) return [];
  const members = await res.json();
  return members.map((m: any) => ({
    id: String(m.id),
    name: m.name,
    role: m.title || "",
    bio: m.bio || "",
    location: "",
    image: m.photo_url || "",
    imageAlt: m.name,
    linkedin: m.linkedin_url || "",
    featured: false,
  }));
}

export default function AdminAboutPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("team");
  const [board, setBoard] = useState<AboutPerson[]>([]);
  const [team, setTeam] = useState<AboutPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setError("Sign in required.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const pages = await listAdminCmsPages(token);
      const about = findCmsPageBySlug<AboutPagePayload>(pages, "about");
      if (!about?.payload) {
        throw new Error("About CMS page not found.");
      }

      // Fetch team and board from database endpoints
      const [teamMembers, boardMembers] = await Promise.all([
        listAdminTeam(token),
        listAdminBoard(token),
      ]);

      setTeam(teamMembers);
      setBoard(boardMembers);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PageHeader
        title="About Page"
        description="Team and board members from database."
      />

      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="mb-6 flex gap-2 border-b border-border">
        {(["team", "board"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t
                ? "border-b-2 border-accent text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t === "team" ? `Team (${team.length})` : `Board (${board.length})`}
          </button>
        ))}
      </div>

      {/* Team Section */}
      {tab === "team" && (
        <div className="space-y-4">
          {team.length === 0 ? (
            <p className="text-sm text-muted">No team members loaded.</p>
          ) : (
            team.map((person) => (
              <div key={person.id} className="rounded border border-border p-4">
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
                {person.bio && <p className="mt-2 text-sm">{person.bio}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {/* Board Section */}
      {tab === "board" && (
        <div className="space-y-4">
          {board.length === 0 ? (
            <p className="text-sm text-muted">No board members loaded.</p>
          ) : (
            board.map((person) => (
              <div key={person.id} className="rounded border border-border p-4">
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
                {person.bio && <p className="mt-2 text-sm">{person.bio}</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
