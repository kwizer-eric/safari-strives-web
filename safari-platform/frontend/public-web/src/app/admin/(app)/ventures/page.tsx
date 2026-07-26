"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader, TextArea } from "@safari/ui";
import {
  findCmsCollectionByKey,
  findCmsPageBySlug,
  listAdminCmsCollections,
  listAdminCmsPages,
  patchAdminCmsCollection,
  patchAdminCmsPage,
  slugify,
} from "@/lib/cms";
import { mediaUrlValidationMessage } from "@/lib/media-url";
import type { Venture, VenturesPagePayload } from "@/types/content";

type Tab = "hero" | "list";
type HeroMediaKind = "video" | "photo";

const emptyVenture = (): Venture => ({
  id: "",
  founder: "",
  ventureName: "",
  category: "",
  location: "",
  image: "",
  imageAlt: "",
  tagline: "",
  story: [""],
  highlights: [{ title: "", body: "" }],
});

function heroMediaKind(payload: VenturesPagePayload): HeroMediaKind {
  return payload.heroVideo.trim() ? "video" : "photo";
}

export default function AdminVenturesPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("hero");
  const [pageId, setPageId] = useState<number | null>(null);
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [payload, setPayload] = useState<VenturesPagePayload | null>(null);
  const [heroKind, setHeroKind] = useState<HeroMediaKind>("photo");
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [editing, setEditing] = useState<Venture | null>(null);
  const [loading, setLoading] = useState(true);
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
      const [pages, collections] = await Promise.all([
        listAdminCmsPages(token),
        listAdminCmsCollections(token),
      ]);
      const page = findCmsPageBySlug<VenturesPagePayload>(pages, "ventures");
      const col = findCmsCollectionByKey<{ items: Venture[] }>(
        collections,
        "ventures",
      );
      if (!page?.payload || !col) {
        throw new Error("Ventures CMS content missing. Seed CMS content.");
      }
      setPageId(page.id);
      setCollectionId(col.id);
      setPayload(page.payload);
      setHeroKind(heroMediaKind(page.payload));
      setVentures(col.payload?.items ?? []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveHero() {
    if (!token || pageId == null || !payload) return;

    if (heroKind === "video") {
      const validationError = mediaUrlValidationMessage(payload.heroVideo);
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (!payload.heroImage.trim()) {
      setError("Enter a photo URL.");
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const nextPayload: VenturesPagePayload = {
        ...payload,
        heroVideo: heroKind === "video" ? payload.heroVideo.trim() : "",
        heroImage:
          heroKind === "photo" ? payload.heroImage.trim() : payload.heroImage,
        heroImageAlt:
          payload.heroImageAlt.trim() ||
          (heroKind === "photo" ? "Ventures hero photo" : "Ventures hero video"),
      };
      await patchAdminCmsPage(token, pageId, { payload: nextPayload });
      setPayload(nextPayload);
      setMessage("Hero saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function saveVentures(next: Venture[]) {
    if (!token || collectionId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, collectionId, {
        payload: { items: next },
      });
      setVentures(next);
      setEditing(null);
      setMessage("Venture saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(venture: Venture) {
    setMessage(null);
    setError(null);
    setEditing(venture);
  }

  if (loading) {
    return (
      <div>
        <PageHeader title="Ventures" description="Hero media and venture photos." />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Ventures"
        description="Hero background (video or photo) and venture profile media."
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
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={tab === "hero" ? "primary" : "secondary"}
            onClick={() => {
              setMessage(null);
              setError(null);
              setTab("hero");
            }}
          >
            Hero
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tab === "list" ? "primary" : "secondary"}
            onClick={() => {
              setMessage(null);
              setError(null);
              setTab("list");
            }}
          >
            Ventures
          </Button>
        </div>
      )}

      {tab === "hero" && payload && !editing && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void saveHero();
          }}
          className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold">Hero background</h2>
          <p className="text-sm text-muted">
            Replace the hero media only. Headline copy stays as seeded.
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={heroKind === "video" ? "primary" : "secondary"}
              onClick={() => setHeroKind("video")}
            >
              Video
            </Button>
            <Button
              type="button"
              size="sm"
              variant={heroKind === "photo" ? "primary" : "secondary"}
              onClick={() => setHeroKind("photo")}
            >
              Photo
            </Button>
          </div>

          {heroKind === "video" ? (
            <Input
              label="Hero video URL"
              value={payload.heroVideo}
              onChange={(e) =>
                setPayload({ ...payload, heroVideo: e.target.value })
              }
              hint="https — Cloudflare, YouTube, Google Drive, or Cloudinary video."
              placeholder="https://..."
              required
            />
          ) : (
            <Input
              label="Hero photo URL"
              value={payload.heroImage}
              onChange={(e) =>
                setPayload({ ...payload, heroImage: e.target.value })
              }
              hint="Cloudinary, Unsplash, or site path — https://res.cloudinary.com/…"
              placeholder="https://res.cloudinary.com/..."
              required
            />
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save hero"}
          </Button>
        </form>
      )}

      {tab === "list" && !editing && (
        <div className="space-y-4">
          <div className="flex justify-between gap-3">
            <p className="text-sm text-muted">{ventures.length} ventures</p>
            <Button
              type="button"
              size="sm"
              onClick={() => startEdit(emptyVenture())}
            >
              Add venture
            </Button>
          </div>
          <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
            {ventures.map((venture) => (
              <li
                key={venture.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="flex items-center gap-3">
                  {venture.image ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={venture.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-semibold">{venture.ventureName}</p>
                    <p className="text-sm text-muted">
                      {venture.founder} · {venture.category}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(venture)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      void saveVentures(
                        ventures.filter((item) => item.id !== venture.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
            {ventures.length === 0 && (
              <li className="p-6 text-sm text-muted">No ventures yet.</li>
            )}
          </ul>
        </div>
      )}

      {editing && (
        <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              {editing.id ? "Edit venture" : "New venture"}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setEditing(null)}
            >
              Back to list
            </Button>
          </div>

          <Input
            label="Photo URL"
            value={editing.image}
            onChange={(e) => setEditing({ ...editing, image: e.target.value })}
            hint="Cloudinary or other https image URL"
            placeholder="https://res.cloudinary.com/..."
            required
          />
          <Input
            label="Venture name"
            value={editing.ventureName}
            onChange={(e) =>
              setEditing({ ...editing, ventureName: e.target.value })
            }
            required
          />
          <Input
            label="Founder"
            value={editing.founder}
            onChange={(e) =>
              setEditing({ ...editing, founder: e.target.value })
            }
            required
          />
          <Input
            label="Category"
            value={editing.category}
            onChange={(e) =>
              setEditing({ ...editing, category: e.target.value })
            }
          />
          <Input
            label="Location"
            value={editing.location ?? ""}
            onChange={(e) =>
              setEditing({ ...editing, location: e.target.value })
            }
          />
          <Input
            label="Tagline"
            value={editing.tagline}
            onChange={(e) =>
              setEditing({ ...editing, tagline: e.target.value })
            }
          />
          <TextArea
            label="Story (one paragraph per line)"
            rows={6}
            value={editing.story.join("\n")}
            onChange={(e) =>
              setEditing({
                ...editing,
                story: e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
              })
            }
          />
          <TextArea
            label="Highlights (format: Title | Body — one per line)"
            rows={4}
            value={editing.highlights
              .map((h) => `${h.title} | ${h.body}`)
              .join("\n")}
            onChange={(e) =>
              setEditing({
                ...editing,
                highlights: e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [title, ...rest] = line.split("|");
                    return {
                      title: (title ?? "").trim(),
                      body: rest.join("|").trim(),
                    };
                  }),
              })
            }
          />
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={
                saving ||
                !editing.ventureName.trim() ||
                !editing.founder.trim() ||
                !editing.image.trim()
              }
              onClick={() => {
                const id =
                  editing.id ||
                  slugify(editing.ventureName) ||
                  `venture-${Date.now()}`;
                const nextItem: Venture = {
                  ...editing,
                  id,
                  imageAlt:
                    editing.imageAlt.trim() ||
                    `${editing.ventureName.trim()} photo`,
                };
                const exists = ventures.some((item) => item.id === id);
                const next = exists
                  ? ventures.map((item) => (item.id === id ? nextItem : item))
                  : [...ventures, nextItem];
                void saveVentures(next);
              }}
            >
              {saving ? "Saving…" : "Save venture"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
