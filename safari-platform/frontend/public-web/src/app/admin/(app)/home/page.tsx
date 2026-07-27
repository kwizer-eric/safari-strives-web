"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@safari/auth";
import {
  Alert,
  Button,
  Input,
  PageHeader,
  Table,
  TextArea,
  type TableColumn,
} from "@safari/ui";
import type { Testimonial } from "@/types/content";
import {
  listAdminCmsCollections,
  listAdminCmsPages,
  patchAdminCmsCollection,
  patchAdminCmsPage,
  type HomeInMotionCard,
  type HomePayload,
  type HomePillar,
} from "@/lib/cms";
import {
  isAllowedExternalMediaUrl,
  mediaUrlValidationMessage,
} from "@/lib/media-url";

type HomeTab =
  | "hero"
  | "what-we-offer"
  | "in-motion"
  | "testimonials";

type TestimonialDraft = {
  id: string;
  name: string;
  position: string;
  company: string;
  review: string;
};

const TABS: { id: HomeTab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "what-we-offer", label: "What we offer" },
  { id: "in-motion", label: "In Motion" },
  { id: "testimonials", label: "Testimonials" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseRole(role: string): { position: string; company: string } {
  const [position, ...rest] = role.split(",").map((part) => part.trim());
  return {
    position: position || "",
    company: rest.join(", "),
  };
}

function toDraft(item: Testimonial): TestimonialDraft {
  const { position, company } = parseRole(item.role);
  return {
    id: item.id,
    name: item.name,
    position,
    company,
    review: item.quote,
  };
}

function fromDraft(item: TestimonialDraft): Testimonial {
  return {
    id: item.id,
    name: item.name,
    role: [item.position, item.company].filter(Boolean).join(", "),
    quote: item.review,
  };
}

const emptyInMotion = (): HomeInMotionCard => ({
  id: "",
  label: "",
  image: "",
  imageAlt: "",
});

const emptyTestimonial = (): TestimonialDraft => ({
  id: "",
  name: "",
  position: "",
  company: "",
  review: "",
});

function tabFromSearch(value: string | null): HomeTab {
  if (
    value === "hero" ||
    value === "what-we-offer" ||
    value === "in-motion" ||
    value === "testimonials"
  ) {
    return value;
  }
  return "hero";
}

export default function AdminHomePage() {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeader
            title="Home"
            description="Manage homepage hero, offers, In Motion, and testimonials."
          />
          <p className="text-sm text-muted">Loading…</p>
        </div>
      }
    >
      <AdminHomePageInner />
    </Suspense>
  );
}

function AdminHomePageInner() {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<HomeTab>(() =>
    tabFromSearch(searchParams.get("tab")),
  );

  const [homePageId, setHomePageId] = useState<number | null>(null);
  const [testimonialsCollectionId, setTestimonialsCollectionId] = useState<
    number | null
  >(null);
  const [payload, setPayload] = useState<HomePayload | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialDraft[]>([]);

  const [editingPillar, setEditingPillar] = useState<HomePillar | null>(null);
  const [editingCard, setEditingCard] = useState<HomeInMotionCard | null>(null);
  const [editingTestimonial, setEditingTestimonial] =
    useState<TestimonialDraft | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sync tab from URL query (?tab=...).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab(tabFromSearch(searchParams.get("tab")));
  }, [searchParams]);

  const load = useCallback(async () => {
    if (!token) {
      setError("Sign in required to manage CMS content.");
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
      const homePage = pages.find((page) => page.slug === "home");
      if (!homePage) {
        throw new Error(
          "CMS page 'home' not found. Run: python -m scripts.seed_cms_content",
        );
      }
      setHomePageId(homePage.id);
      setPayload(homePage.payload as HomePayload);

      const testimonialsCollection = collections.find(
        (collection) => collection.key === "testimonials",
      );
      if (!testimonialsCollection) {
        throw new Error("CMS collection 'testimonials' not found.");
      }
      setTestimonialsCollectionId(testimonialsCollection.id);
      const items =
        (testimonialsCollection.payload as { items?: Testimonial[] }).items ??
        [];
      setTestimonials(items.map(toDraft));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Initial data synchronization with the CMS API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function saveHomePayload(
    next: HomePayload,
    successMessage: string,
  ): Promise<boolean> {
    if (homePageId == null || !token) return false;
    setSaving(true);
    setError(null);
    try {
      const updated = await patchAdminCmsPage(token, homePageId, {
        payload: next,
      });
      setPayload(updated.payload);
      setMessage(successMessage);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function saveTestimonials(
    next: TestimonialDraft[],
    successMessage: string,
  ): Promise<boolean> {
    if (testimonialsCollectionId == null || !token) return false;
    setSaving(true);
    setError(null);
    try {
      await patchAdminCmsCollection(token, testimonialsCollectionId, {
        payload: { items: next.map(fromDraft) },
      });
      setTestimonials(next);
      setMessage(successMessage);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  const pillarColumns: TableColumn<HomePillar>[] = useMemo(
    () => [
      {
        key: "pillar",
        header: "Pillar",
        render: (pillar) => (
          <div className="flex items-center gap-3">
            {pillar.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pillar.image}
                alt={pillar.imageAlt || pillar.title}
                className="h-12 w-16 rounded-lg object-cover"
              />
            ) : (
              <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-cream text-xs text-muted">
                No image
              </span>
            )}
            <div>
              <p className="font-semibold text-foreground">{pillar.title}</p>
              <p className="text-xs text-muted">{pillar.href}</p>
            </div>
          </div>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (pillar) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditingPillar(pillar);
              }}
            >
              Edit
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const inMotionColumns: TableColumn<HomeInMotionCard>[] = useMemo(
    () => [
      {
        key: "card",
        header: "Card",
        render: (card) => (
          <div className="flex items-center gap-3">
            {card.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt={card.imageAlt || card.label}
                className="h-12 w-16 rounded-lg object-cover"
              />
            ) : (
              <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-cream text-xs text-muted">
                No image
              </span>
            )}
            <p className="font-semibold text-foreground">{card.label}</p>
          </div>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (card) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditingCard(card);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              disabled={!payload || saving}
              onClick={() => {
                if (!payload) return;
                const nextCards = payload.inMotion.cards.filter(
                  (item) => item.id !== card.id,
                );
                void saveHomePayload(
                  {
                    ...payload,
                    inMotion: { ...payload.inMotion, cards: nextCards },
                  },
                  `Removed “${card.label}”.`,
                );
                if (editingCard?.id === card.id) setEditingCard(null);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [editingCard?.id, payload, saving],
  );

  const testimonialColumns: TableColumn<TestimonialDraft>[] = useMemo(
    () => [
      {
        key: "person",
        header: "Person",
        render: (item) => (
          <div>
            <p className="font-semibold text-foreground">{item.name}</p>
            <p className="text-xs text-muted">
              {[item.position, item.company].filter(Boolean).join(" · ")}
            </p>
          </div>
        ),
      },
      {
        key: "review",
        header: "Review",
        render: (item) => (
          <p className="max-w-md line-clamp-2 text-sm text-muted">
            {item.review}
          </p>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (item) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditingTestimonial(item);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              disabled={saving}
              onClick={() => {
                const next = testimonials.filter(
                  (entry) => entry.id !== item.id,
                );
                void saveTestimonials(next, `Removed ${item.name}.`);
                if (editingTestimonial?.id === item.id) {
                  setEditingTestimonial(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [editingTestimonial?.id, saving, testimonials],
  );

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Home"
          description="Manage homepage hero, offers, In Motion, and testimonials."
        />
        <p className="text-sm text-muted">Loading CMS content…</p>
      </div>
    );
  }

  if (!payload) {
    return (
      <div>
        <PageHeader title="Home" description="Homepage content manager." />
        {error && (
          <Alert tone="danger" className="mb-6">
            {error}
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Home"
        description="Manage homepage media, In Motion cards, and testimonials. Section copy is not editable here."
      />

      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {message && (
        <Alert tone="success" className="mb-6">
          {message}
        </Alert>
      )}

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={tab === item.id ? "primary" : "secondary"}
            onClick={() => {
              setMessage(null);
              setTab(item.id);
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {tab === "hero" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const validationError = mediaUrlValidationMessage(
              payload.hero.heroVideo,
            );
            if (validationError) {
              setError(validationError);
              setMessage(null);
              return;
            }
            void saveHomePayload(payload, "Hero video saved.");
          }}
          className="rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Hero video
          </h2>
          <div className="grid gap-4">
            <Input
              label="Hero video URL"
              value={payload.hero.heroVideo}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, heroVideo: e.target.value },
                })
              }
              hint="https only — Cloudflare Stream/R2, YouTube, or Google Drive. For Drive: Share → Anyone with the link (Viewer). YouTube/Cloudflare autoplay more reliably than Drive."
              placeholder="https://..."
              required
            />
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save hero"}
            </Button>
          </div>
        </form>
      )}

      {tab === "what-we-offer" && (
        <div>
          {editingPillar && (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const imageError = mediaUrlValidationMessage(
                  editingPillar.image,
                );
                if (imageError) {
                  setError(imageError);
                  setMessage(null);
                  return;
                }
                const nextPillars = payload.explore.pillars.map((pillar) =>
                  pillar.id === editingPillar.id ? editingPillar : pillar,
                );
                const ok = await saveHomePayload(
                  {
                    ...payload,
                    explore: { ...payload.explore, pillars: nextPillars },
                  },
                  `Updated “${editingPillar.title}”.`,
                );
                if (ok) setEditingPillar(null);
              }}
              className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Edit pillar — {editingPillar.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Title"
                  value={editingPillar.title}
                  onChange={(e) =>
                    setEditingPillar({
                      ...editingPillar,
                      title: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Link href"
                  value={editingPillar.href}
                  onChange={(e) =>
                    setEditingPillar({
                      ...editingPillar,
                      href: e.target.value,
                    })
                  }
                  required
                />
                <div className="md:col-span-2">
                  <TextArea
                    label="Description"
                    value={editingPillar.description}
                    onChange={(e) =>
                      setEditingPillar({
                        ...editingPillar,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <Input
                  label="Image URL"
                  value={editingPillar.image}
                  onChange={(e) =>
                    setEditingPillar({
                      ...editingPillar,
                      image: e.target.value,
                    })
                  }
                  hint="https link only (e.g. Cloudflare R2). No local files or uploads."
                  placeholder="https://..."
                  required
                />
                <Input
                  label="Image alt"
                  value={editingPillar.imageAlt}
                  onChange={(e) =>
                    setEditingPillar({
                      ...editingPillar,
                      imageAlt: e.target.value,
                    })
                  }
                  required
                />
                {editingPillar.image &&
                isAllowedExternalMediaUrl(editingPillar.image) ? (
                  <div className="md:col-span-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingPillar.image}
                      alt={editingPillar.imageAlt || editingPillar.title}
                      className="h-36 w-56 rounded-xl object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div className="mt-6 flex gap-3">
                <Button type="submit" disabled={saving}>
                  Save pillar
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditingPillar(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <Table
            columns={pillarColumns}
            rows={[...payload.explore.pillars]}
            getRowKey={(pillar) => pillar.id}
            emptyMessage="No pillars yet."
          />
        </div>
      )}

      {tab === "in-motion" && (
        <div>
          <div className="mb-8">
            <Button
              type="button"
              onClick={() => {
                setMessage(null);
                setEditingCard(emptyInMotion());
              }}
            >
              Add card
            </Button>
          </div>

          {editingCard && (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if (!editingCard.label.trim()) {
                  setError("Label is required.");
                  setMessage(null);
                  return;
                }
                const imageError = mediaUrlValidationMessage(editingCard.image);
                if (imageError) {
                  setError(imageError);
                  setMessage(null);
                  return;
                }
                const id =
                  editingCard.id ||
                  slugify(editingCard.label) ||
                  `in-motion-${Date.now()}`;
                const nextCard: HomeInMotionCard = {
                  ...editingCard,
                  id,
                  imageAlt: editingCard.imageAlt || editingCard.label,
                };
                const exists = payload.inMotion.cards.some(
                  (card) => card.id === id,
                );
                const nextCards = exists
                  ? payload.inMotion.cards.map((card) =>
                      card.id === id ? nextCard : card,
                    )
                  : [...payload.inMotion.cards, nextCard];
                const ok = await saveHomePayload(
                  {
                    ...payload,
                    inMotion: { ...payload.inMotion, cards: nextCards },
                  },
                  editingCard.id ? "Card updated." : "Card added.",
                );
                if (ok) setEditingCard(null);
              }}
              className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                {editingCard.id ? "Edit card" : "New card"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Label"
                  value={editingCard.label}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, label: e.target.value })
                  }
                  required
                />
                <Input
                  label="Image URL"
                  value={editingCard.image}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, image: e.target.value })
                  }
                  hint="https link only (e.g. Cloudflare R2). No local files or uploads."
                  placeholder="https://..."
                  required
                />
                <Input
                  label="Image alt"
                  value={editingCard.imageAlt}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      imageAlt: e.target.value,
                    })
                  }
                />
                {editingCard.image &&
                isAllowedExternalMediaUrl(editingCard.image) ? (
                  <div className="md:col-span-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingCard.image}
                      alt={editingCard.imageAlt || editingCard.label}
                      className="h-36 w-56 rounded-xl object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div className="mt-6 flex gap-3">
                <Button type="submit" disabled={saving}>
                  Save card
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditingCard(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <Table
            columns={inMotionColumns}
            rows={[...payload.inMotion.cards]}
            getRowKey={(card) => card.id}
            emptyMessage="No In Motion cards yet."
          />
        </div>
      )}

      {tab === "testimonials" && (
        <div>
          <div className="mb-6">
            <Button
              onClick={() => {
                setMessage(null);
                setEditingTestimonial(emptyTestimonial());
              }}
            >
              Add testimonial
            </Button>
          </div>

          {editingTestimonial && (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if (
                  !editingTestimonial.name.trim() ||
                  !editingTestimonial.review.trim()
                ) {
                  setMessage("Name and review are required.");
                  return;
                }
                const id =
                  editingTestimonial.id ||
                  slugify(editingTestimonial.name) ||
                  `testimonial-${Date.now()}`;
                const nextItem: TestimonialDraft = {
                  ...editingTestimonial,
                  id,
                };
                const exists = testimonials.some((item) => item.id === id);
                const next = exists
                  ? testimonials.map((item) =>
                      item.id === id ? nextItem : item,
                    )
                  : [...testimonials, nextItem];
                const ok = await saveTestimonials(
                  next,
                  editingTestimonial.id
                    ? "Testimonial updated."
                    : "Testimonial added.",
                );
                if (ok) setEditingTestimonial(null);
              }}
              className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                {editingTestimonial.id
                  ? "Edit testimonial"
                  : "New testimonial"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Name"
                  value={editingTestimonial.name}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      name: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Position"
                  value={editingTestimonial.position}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      position: e.target.value,
                    })
                  }
                />
                <Input
                  label="Company / place"
                  value={editingTestimonial.company}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      company: e.target.value,
                    })
                  }
                />
                <div className="md:col-span-2">
                  <TextArea
                    label="Review"
                    value={editingTestimonial.review}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        review: e.target.value,
                      })
                    }
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button type="submit" disabled={saving}>
                  Save testimonial
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditingTestimonial(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <Table
            columns={testimonialColumns}
            rows={testimonials}
            getRowKey={(item) => item.id}
            emptyMessage="No testimonials yet."
          />
        </div>
      )}
    </div>
  );
}
