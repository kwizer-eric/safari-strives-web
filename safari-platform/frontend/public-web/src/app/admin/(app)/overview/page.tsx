"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_BACKEND_URL } from "@safari/shared";
import { PageHeader, StatCard, Alert } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { readApplyUrl } from "@/lib/apply-url";
import {
  listAdminCmsCollections,
  listAdminCmsPages,
  type HomePayload,
} from "@/lib/cms";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_BACKEND_URL}/api/v1`;

const shortcuts = [
  { label: "Home", href: "/admin/home" },
  { label: "Application Link", href: "/admin/application-link" },
  { label: "Our Model", href: "/admin/our-model" },
  { label: "Ventures", href: "/admin/ventures" },
  { label: "Blog", href: "/admin/blog" },
  { label: "About", href: "/admin/about" },
] as const;

type OverviewStats = {
  programs: number;
  inMotion: number;
  testimonials: number;
  articles: number;
  team: number;
  partners: number;
  ventures: number;
};

const emptyStats: OverviewStats = {
  programs: 0,
  inMotion: 0,
  testimonials: 0,
  articles: 0,
  team: 0,
  partners: 0,
  ventures: 0,
};

export default function OverviewPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<OverviewStats>(emptyStats);
  const [applyUrl, setApplyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setApplyUrl(readApplyUrl());

    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Program pages live on /pages (typed CMS). Home/collections live on /admin/cms.
        const [programPagesRes, cmsPages, collections] = await Promise.all([
          fetch(`${API_URL}/pages`, { cache: "no-store" }),
          listAdminCmsPages(token),
          listAdminCmsCollections(token),
        ]);

        const programPages = programPagesRes.ok
          ? ((await programPagesRes.json()) as unknown[])
          : [];

        const home = cmsPages.find((page) => page.slug === "home");
        const homePayload = (home?.payload ?? null) as HomePayload | null;

        const countItems = (key: string) => {
          const collection = collections.find((item) => item.key === key);
          const items = (collection?.payload as { items?: unknown[] } | undefined)
            ?.items;
          return Array.isArray(items) ? items.length : 0;
        };

        setStats({
          programs: Array.isArray(programPages) ? programPages.length : 0,
          inMotion: homePayload?.inMotion?.cards?.length ?? 0,
          testimonials: countItems("testimonials"),
          articles: countItems("articles"),
          team: countItems("team-members"),
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
        description="Live counts from the CMS and published program pages."
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
          label="Programs"
          value={stats.programs}
          hint="Published program pages"
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
          label="Team members"
          value={stats.team}
          hint="About page team"
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
