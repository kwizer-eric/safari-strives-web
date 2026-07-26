"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, PageHeader } from "@safari/ui";
import { listAdminCmsCollections, listAdminCmsPages } from "@/lib/cms";
import type { AboutPartner, AboutPerson } from "@/types/content";

export default function AdminAboutPage() {
  const { token } = useAuth();
  const [team, setTeam] = useState<AboutPerson[]>([]);
  const [partners, setPartners] = useState<AboutPartner[]>([]);
  const [heroVideo, setHeroVideo] = useState("");
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
        const [pages, collections] = await Promise.all([
          listAdminCmsPages(token),
          listAdminCmsCollections(token),
        ]);
        const about = pages.find((page) => page.slug === "about");
        const payload = about?.payload as
          | { hero?: { heroVideo?: string } }
          | undefined;
        setHeroVideo(payload?.hero?.heroVideo ?? "");

        const teamCol = collections.find((c) => c.key === "team-members");
        const partnersCol = collections.find((c) => c.key === "partners");
        setTeam(
          ((teamCol?.payload as { items?: AboutPerson[] })?.items ?? []),
        );
        setPartners(
          ((partnersCol?.payload as { items?: AboutPartner[] })?.items ?? []),
        );
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
        title="About"
        description="About page content from the CMS (team, partners, hero video)."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="space-y-8">
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Hero video</h2>
            <p className="text-sm text-muted">{heroVideo || "—"}</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Team ({team.length})
            </h2>
            <ul className="space-y-2 text-sm">
              {team.map((person) => (
                <li key={person.id}>
                  <span className="font-medium">{person.name}</span>
                  <span className="text-muted"> — {person.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Partners ({partners.length})
            </h2>
            <ul className="space-y-2 text-sm">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <span className="font-medium">{partner.name}</span>
                  <span className="text-muted"> — {partner.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
