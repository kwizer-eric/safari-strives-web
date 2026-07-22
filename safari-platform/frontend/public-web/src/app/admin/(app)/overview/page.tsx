"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Program } from "@safari/shared";
import { PageHeader, StatCard, Alert } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { articles } from "@/data/articles";
import { ventures } from "@/data/ventures";
import { home } from "@/data/home";
import { testimonials } from "@/data/testimonials";
import { partners, teamMembers } from "@/data/about";
import { readApplyUrl } from "@/lib/apply-url";

const shortcuts = [
  { label: "Application Link", href: "/admin/application-link" },
  { label: "Programs", href: "/admin/programs" },
  { label: "Ventures", href: "/admin/ventures" },
  { label: "In Motion", href: "/admin/in-motion" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Blog", href: "/admin/blog" },
  { label: "About", href: "/admin/about" },
] as const;

export default function OverviewPage() {
  const { api } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applyUrl, setApplyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setApplyUrl(readApplyUrl());
    api.programs
      .list()
      .then((res) => setPrograms(res.programs))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const openSeats = programs.reduce((sum, p) => sum + p.seatsRemaining, 0);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Content counts from the sections in this admin dashboard."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Programs"
          value={programs.length}
          hint={`${openSeats} open seats`}
        />
        <StatCard
          label="Venturists"
          value={ventures.length}
          hint="Founders on /ventures"
        />
        <StatCard
          label="In Motion cards"
          value={home.inMotion.cards.length}
          hint="Homepage marquee"
        />
        <StatCard
          label="Testimonials"
          value={testimonials.length}
          hint="Homepage marquee"
        />
        <StatCard
          label="Blog posts"
          value={articles.length}
          hint="Field Notes articles"
        />
        <StatCard
          label="Team members"
          value={teamMembers.length}
          hint="About page team"
        />
        <StatCard
          label="Partners"
          value={partners.length}
          hint="About page logos"
        />
        <StatCard
          label="Application link"
          value={applyUrl ? "Set" : "Missing"}
          hint={applyUrl ? applyUrl.replace(/^https?:\/\//, "").slice(0, 36) : "Add in Application Link"}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Dashboard sections
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {shortcuts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Next actions
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Confirm the Application Link points to the live Google Form.</li>
            <li>Refresh In Motion and Testimonials for the homepage.</li>
            <li>Publish new Field Notes from Blog when ready.</li>
            <li>Keep About team and partner logos up to date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
