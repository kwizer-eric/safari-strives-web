"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader, StatCard, Alert } from "@safari/ui";
import { useAuth } from "@safari/auth";
import {
  listAdminCmsCollections,
  listAdminCmsPages,
  type HomePayload,
} from "@/lib/cms";
import type { SiteSettings } from "@/types/content";

const shortcuts = [
  { label: "Home", href: "/admin/home" },
  { label: "Application Link", href: "/admin/application-link" },
  { label: "Our Model", href: "/admin/our-model" },
  { label: "Ventures", href: "/admin/ventures" },
  { label: "Blog", href: "/admin/blog" },
  { label: "About", href: "/admin/about" },
] as const;

type OverviewStats = {
  inMotion: number;
  testimonials: number;
  articles: number;
  team: number;
  board: number;
  partners: number;
  ventures: number;
};

const emptyStats: OverviewStats = {
  inMotion: 0,
  testimonials: 0,
  articles: 0,
  team: 0,
  board: 0,
  partners: 0,
  ventures: 0,
};

async function listAdminTeam(token: string): Promise<Array<{ id: number; name: string }>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/admin/people/team`, {
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return [];
  return res.json();
}

async function listAdminBoard(token: string): Promise<Array<{ id: number; name: string }>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/admin/people/board`, {
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return [];
  return res.json();
}

export default function OverviewPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<OverviewStats>(emptyStats);
  const [applyUrl, setApplyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [cmsPages, collections, teamMembers, boardMembers] = await Promise.all([
          listAdminCmsPages(token),
          listAdminCmsCollections(token),
          listAdminTeam(token),
          listAdminBoard(token),
        ]);

        const home = cmsPages.find((page) => page.slug === "home");
        const homePayload = (home?.payload ?? null) as HomePayload | null;
        const site = collections.find((item) => item.key === "site");
        const sitePayload = (site?.payload ?? null) as SiteSettings | null;
        setApplyUrl(sitePayload?.applyUrl?.trim() ?? "");

        const countItems = (key: string) => {
          const collection = collections.find((item) => item.key === key);
          const items = (collection?.payload as { items?: unknown[] } | undefined)
            ?.items;
          return Array.isArray(items) ? items.length : 0;
        };

        setStats({
          inMotion: homePayload?.inMotion?.cards?.length ?? 0,
          testimonials: countItems("testimonials"),
          articles: countItems("articles"),
          team: teamMembers.length,
          board: boardMembers.length,
          partners: countItems("partners"),
          ventures: countItems("ventures"),
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [token]);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Live counts from the CMS and database."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading && (
        <p className="mb-6 text-sm text-muted">Loading dashboard stats…</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Team members"
          value={stats.team}
          hint="Staff team"
        />
        <StatCard
          label="Board members"
          value={stats.board}
          hint="Board members"
        />
        <StatCard
          label="Venturists"
          value={stats.ventures}
          hint="CMS ventures collection"
        />
        <StatCard
          label="In Motion cards"
          value={stats.inMotion}
          hint="Homepage marquee"
        />
        <StatCard
          label="Testimonials"
          value={stats.testimonials}
          hint="Homepage marquee"
        />
        <StatCard
          label="Blog posts"
          value={stats.articles}
          hint="Field Notes articles"
        />
        <StatCard
          label="Partners"
          value={stats.partners}
          hint="About page logos"
        />
        <StatCard
          label="Application link"
          value={applyUrl ? "Set" : "Missing"}
          hint={
            applyUrl
              ? applyUrl.replace(/^https?:\/\//, "").slice(0, 36)
              : "Add in Application Link"
          }
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
            <li>Refresh Home → In Motion and Testimonials.</li>
            <li>Publish new Field Notes from Blog when CMS-wired.</li>
            <li>Keep About team and partner logos up to date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
