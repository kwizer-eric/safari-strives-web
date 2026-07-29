"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader } from "@safari/ui";
import {
  getAdminProgramPage,
  listAdminProgramPages,
  putAdminProgramPage,
  type ProgramPage,
  type ProgramPageSummary,
} from "@/lib/cms";
import { mediaUrlValidationMessage, looksLikeImageUrl } from "@/lib/media-url";

type MediaKind = "video" | "photo";

const PROGRAM_PAGES = [
  {
    slug: "our-model",
    label: "Venture Accelerator",
    path: "/our-model",
  },
  {
    slug: "green-enterprise-lab",
    label: "Generative Enterprise Lab",
    path: "/green-enterprise-lab",
  },
  {
    slug: "the-hub",
    label: "The Hub",
    path: "/the-hub",
  },
] as const;

function toReplaceBody(page: ProgramPage): Omit<ProgramPage, "id"> {
  const { id: _id, ...rest } = page;
  return {
    ...rest,
    features: page.features.map(({ id: _fid, ...feature }) => feature),
    sections: page.sections.map(({ id: _sid, ...section }) => section),
  };
}

function labelForSlug(slug: string): string {
  return PROGRAM_PAGES.find((item) => item.slug === slug)?.label ?? slug;
}

function pathForSlug(slug: string): string {
  return PROGRAM_PAGES.find((item) => item.slug === slug)?.path ?? `/${slug}`;
}

export default function AdminOurModelPage() {
  const { token } = useAuth();
  const [summaries, setSummaries] = useState<ProgramPageSummary[]>([]);
  const [editing, setEditing] = useState<ProgramPage | null>(null);
  const [mediaKind, setMediaKind] = useState<MediaKind>("video");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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
      const all = await listAdminProgramPages(token);
      const ordered = PROGRAM_PAGES.map((meta) =>
        all.find((page) => page.slug === meta.slug),
      ).filter((page): page is ProgramPageSummary => Boolean(page));

      if (ordered.length === 0) {
        throw new Error(
          "Program pages missing. Seed with: python -m scripts.seed_program_pages",
        );
      }
      setSummaries(ordered);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function openEdit(summary: ProgramPageSummary) {
    if (!token) return;
    setLoadingEdit(true);
    setMessage(null);
    setError(null);
    try {
      const full = await getAdminProgramPage(token, summary.id);
      const url = full.hero_video_url ?? "";
      setEditing(full);
      setMediaUrl(url);
      setMediaKind(url && looksLikeImageUrl(url) ? "photo" : "video");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingEdit(false);
    }
  }

  async function save() {
    if (!token || !editing) return;
    const nextUrl = mediaUrl.trim();
    if (!nextUrl) {
      setError("Enter a video or photo URL.");
      return;
    }
    if (mediaKind === "video") {
      const validationError = mediaUrlValidationMessage(nextUrl);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const label = labelForSlug(editing.slug);
      const nextPage: ProgramPage = {
        ...editing,
        hero_video_url: nextUrl,
        hero_media_alt:
          editing.hero_media_alt ||
          (mediaKind === "photo" ? `${label} hero photo` : `${label} hero video`),
      };
      const saved = await putAdminProgramPage(
        token,
        editing.id,
        toReplaceBody(nextPage),
      );
      setEditing(saved);
      setMediaUrl(saved.hero_video_url ?? "");
      setSummaries((prev) =>
        prev.map((item) =>
          item.id === saved.id
            ? {
                id: saved.id,
                slug: saved.slug,
                is_published: saved.is_published,
                hero_title: saved.hero_title,
              }
            : item,
        ),
      );
      setMessage(`${label} hero media saved.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Our Model"
          description="Hero media for Accelerator, Green Lab, and The Hub."
        />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Our Model"
        description="Update hero video or photo for each Our Model page. Copy stays as seeded."
      />
      {message && (
        <Alert tone="success" className="mb-6">
          {message}
        </Alert>
      )}
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      {!editing && (
        <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
          {PROGRAM_PAGES.map((meta) => {
            const summary = summaries.find((page) => page.slug === meta.slug);
            return (
              <li
                key={meta.slug}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-semibold">{meta.label}</p>
                  <p className="text-sm text-muted">{meta.path}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={!summary || loadingEdit}
                  onClick={() => summary && void openEdit(summary)}
                >
                  {!summary
                    ? "Missing"
                    : loadingEdit
                      ? "Loading…"
                      : "Edit hero"}
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
          className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {labelForSlug(editing.slug)}
              </h2>
              <p className="text-sm text-muted">{pathForSlug(editing.slug)}</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setEditing(null)}
            >
              Back to list
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={mediaKind === "video" ? "primary" : "secondary"}
              onClick={() => setMediaKind("video")}
            >
              Video
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mediaKind === "photo" ? "primary" : "secondary"}
              onClick={() => setMediaKind("photo")}
            >
              Photo
            </Button>
          </div>

          <Input
            label={mediaKind === "video" ? "Hero video URL" : "Hero photo URL"}
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            hint={
              mediaKind === "video"
                ? "https — Cloudflare, YouTube, Google Drive, or Cloudinary video."
                : "Cloudinary or other https image URL (.jpg, .png, .webp)."
            }
            placeholder="https://..."
            required
          />

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save hero media"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
