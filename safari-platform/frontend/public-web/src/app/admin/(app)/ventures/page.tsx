"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader } from "@safari/ui";
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
import { CmsImage } from "@/components/ui/CmsImage";
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
  videoUrl: "",
  tagline: "",
  story: [],
  highlights: [],
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
    const video = (venture.videoUrl ?? "").trim();
    // Legacy: some rows stored a Cloudinary still in videoUrl — move to image.
    const imageLooksEmpty = !venture.image.trim();
    const videoIsImage =
      !!video &&
      /\.(jpe?g|png|gif|webp|avif)(\?|$)/i.test(video);
    setEditing({
      ...venture,
      image: imageLooksEmpty && videoIsImage ? video : venture.image,
      videoUrl: imageLooksEmpty && videoIsImage ? "" : video,
      imageAlt: venture.imageAlt ?? "",
    });
  }

  if (loading) {
    return (
      <div>
        <PageHeader title="Ventures" description="Hero media and venturists." />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Ventures"
        description="Hero media, venturist photo for the card, and optional click-to-play video."
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
            Venturists
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
              hint="https — Cloudflare, YouTube, Google Drive, or Cloudinary."
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
              hint="Cloudinary or other https image URL"
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
            <p className="text-sm text-muted">{ventures.length} venturists</p>
            <Button
              type="button"
              size="sm"
              onClick={() => startEdit(emptyVenture())}
            >
              Add venturist
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
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                      <CmsImage
                        src={venture.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-semibold">{venture.founder}</p>
                    <p className="text-sm text-muted">{venture.ventureName}</p>
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
              <li className="p-6 text-sm text-muted">No venturists yet.</li>
            )}
          </ul>
        </div>
      )}

      {editing && (
        <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              {editing.id ? "Edit venturist" : "New venturist"}
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
            label="Name"
            value={editing.founder}
            onChange={(e) =>
              setEditing({ ...editing, founder: e.target.value })
            }
            placeholder="Founder name"
            required
          />
          <Input
            label="Business"
            value={editing.ventureName}
            onChange={(e) =>
              setEditing({ ...editing, ventureName: e.target.value })
            }
            placeholder="Business / venture name"
            required
          />
          <Input
            label="Photo URL (venture card)"
            value={editing.image}
            onChange={(e) =>
              setEditing({ ...editing, image: e.target.value })
            }
            hint="Cloudinary or other https image URL shown on the venturist card"
            placeholder="https://res.cloudinary.com/..."
            required
          />
          <Input
            label="Photo alt text"
            value={editing.imageAlt}
            onChange={(e) =>
              setEditing({ ...editing, imageAlt: e.target.value })
            }
            hint="Short description for accessibility"
            placeholder={`${editing.founder.trim() || "Founder"} portrait`}
          />
          <Input
            label="Video URL (plays when card is clicked)"
            value={editing.videoUrl ?? ""}
            onChange={(e) =>
              setEditing({ ...editing, videoUrl: e.target.value })
            }
            hint="Optional. YouTube link or direct https video URL"
            placeholder="https://www.youtube.com/watch?v=…"
          />
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={
                saving ||
                !editing.founder.trim() ||
                !editing.ventureName.trim() ||
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
                  founder: editing.founder.trim(),
                  ventureName: editing.ventureName.trim(),
                  image: editing.image.trim(),
                  videoUrl: (editing.videoUrl ?? "").trim(),
                  imageAlt:
                    editing.imageAlt.trim() ||
                    `${editing.founder.trim()} portrait`,
                };
                const exists = ventures.some((item) => item.id === id);
                const next = exists
                  ? ventures.map((item) => (item.id === id ? nextItem : item))
                  : [...ventures, nextItem];
                void saveVentures(next);
              }}
            >
              {saving ? "Saving…" : "Save venturist"}
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
