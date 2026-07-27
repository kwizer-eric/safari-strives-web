"use client";

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
import { CmsImage } from "@/components/ui/CmsImage";
import { mediaUrlValidationMessage } from "@/lib/media-url";
import type {
  AboutPagePayload,
  AboutPartner,
  AboutPerson,
} from "@/types/content";

type Tab = "hero" | "board" | "team" | "partners";
type PeopleTab = "board" | "team";
type HeroMediaKind = "video" | "photo";

const emptyPerson = (): AboutPerson => ({
  id: "",
  name: "",
  role: "",
  bio: "",
  location: "",
  image: "",
  imageAlt: "",
  featured: false,
});

const emptyPartner = (): AboutPartner => ({
  id: "",
  name: "",
  type: "",
  description: "",
  logo: "",
  href: "",
});

function heroMediaKind(payload: AboutPagePayload): HeroMediaKind {
  return payload.hero.heroVideo.trim() ? "video" : "photo";
}

export default function AdminAboutPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("hero");
  const [pageId, setPageId] = useState<number | null>(null);
  const [boardId, setBoardId] = useState<number | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [partnersId, setPartnersId] = useState<number | null>(null);
  const [payload, setPayload] = useState<AboutPagePayload | null>(null);
  const [heroKind, setHeroKind] = useState<HeroMediaKind>("photo");
  const [board, setBoard] = useState<AboutPerson[]>([]);
  const [team, setTeam] = useState<AboutPerson[]>([]);
  const [partners, setPartners] = useState<AboutPartner[]>([]);
  const [editingPerson, setEditingPerson] = useState<AboutPerson | null>(null);
  const [editingPartner, setEditingPartner] = useState<AboutPartner | null>(
    null,
  );
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
      const about = findCmsPageBySlug<AboutPagePayload>(pages, "about");
      if (!about?.payload) {
        throw new Error("About CMS page not found. Seed CMS content.");
      }
      setPageId(about.id);
      setPayload(about.payload);
      setHeroKind(heroMediaKind(about.payload));

      const boardCol = findCmsCollectionByKey<{ items: AboutPerson[] }>(
        collections,
        "board-members",
      );
      const teamCol = findCmsCollectionByKey<{ items: AboutPerson[] }>(
        collections,
        "team-members",
      );
      const partnersCol = findCmsCollectionByKey<{ items: AboutPartner[] }>(
        collections,
        "partners",
      );
      if (!boardCol || !teamCol || !partnersCol) {
        throw new Error(
          "Board, team, or partners collection missing. Seed CMS content.",
        );
      }
      setBoardId(boardCol.id);
      setTeamId(teamCol.id);
      setPartnersId(partnersCol.id);
      setBoard(boardCol.payload?.items ?? []);
      setTeam(teamCol.payload?.items ?? []);
      setPartners(partnersCol.payload?.items ?? []);
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

  async function saveHero() {
    if (!token || pageId == null || !payload) return;

    if (heroKind === "video") {
      const validationError = mediaUrlValidationMessage(payload.hero.heroVideo);
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (!payload.hero.image.trim()) {
      setError("Enter a photo URL.");
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const nextPayload: AboutPagePayload = {
        ...payload,
        hero: {
          ...payload.hero,
          heroVideo: heroKind === "video" ? payload.hero.heroVideo.trim() : "",
          image: heroKind === "photo" ? payload.hero.image.trim() : payload.hero.image,
          imageAlt:
            payload.hero.imageAlt.trim() ||
            (heroKind === "photo" ? "About hero photo" : "About hero video"),
        },
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

  async function savePeople(kind: PeopleTab, next: AboutPerson[]) {
    const collectionId = kind === "board" ? boardId : teamId;
    if (!token || collectionId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, collectionId, {
        payload: { items: next },
      });
      if (kind === "board") setBoard(next);
      else setTeam(next);
      setEditingPerson(null);
      setMessage(`${kind === "board" ? "Board" : "Team"} saved.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function savePartners(next: AboutPartner[]) {
    if (!token || partnersId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, partnersId, {
        payload: { items: next },
      });
      setPartners(next);
      setEditingPartner(null);
      setMessage("Partners saved.");
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
          title="About"
          description="Hero, board, team, and partner logos."
        />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  const peopleTab: PeopleTab = tab === "board" ? "board" : "team";
  const currentPeople = peopleTab === "board" ? board : team;
  const peopleLabel = peopleTab === "board" ? "board" : "team";

  return (
    <div>
      <PageHeader
        title="About"
        description="Hero background, board members, team members, and partner logos."
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

      {!editingPerson && !editingPartner && (
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["hero", "Hero"],
              ["board", "Board"],
              ["team", "Team"],
              ["partners", "Partners"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={tab === id ? "primary" : "secondary"}
              onClick={() => {
                setMessage(null);
                setError(null);
                setTab(id);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {tab === "hero" && payload && !editingPerson && !editingPartner && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void saveHero();
          }}
          className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold">Hero background</h2>
          <p className="text-sm text-muted">
            Choose a looping background video or a still photo for the About page
            hero.
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
            <>
              <Input
                label="Hero video URL"
                value={payload.hero.heroVideo}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    hero: { ...payload.hero, heroVideo: e.target.value },
                  })
                }
                hint="https — Cloudflare, YouTube, or Google Drive share link."
                placeholder="https://..."
                required
              />
              <Input
                label="Watch video popup (YouTube ID, optional)"
                value={payload.hero.videoId}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    hero: { ...payload.hero, videoId: e.target.value },
                  })
                }
                hint="Shows the “Watch video” button on the hero. Example: njiqUJcuVc4"
                placeholder="YouTube video ID"
              />
            </>
          ) : (
            <Input
              label="Hero photo URL"
              value={payload.hero.image}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, image: e.target.value },
                })
              }
              hint="https link or site path like /images/about-hero.jpg"
              placeholder="https://... or /images/..."
              required
            />
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save hero"}
          </Button>
        </form>
      )}

      {(tab === "board" || tab === "team") && !editingPerson && (
        <div className="space-y-4">
          <div className="flex justify-between gap-3">
            <p className="text-sm text-muted">
              {currentPeople.length} {peopleLabel} members
            </p>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setMessage(null);
                setError(null);
                setEditingPerson(emptyPerson());
              }}
            >
              Add member
            </Button>
          </div>

          <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
            {currentPeople.map((person) => (
              <li
                key={person.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="flex items-center gap-3">
                  {person.image ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                      <CmsImage
                        src={person.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-muted">{person.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setMessage(null);
                      setError(null);
                      setEditingPerson(person);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      void savePeople(
                        peopleTab,
                        currentPeople.filter((item) => item.id !== person.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
            {currentPeople.length === 0 && (
              <li className="p-6 text-sm text-muted">
                No {peopleLabel} members yet.
              </li>
            )}
          </ul>
        </div>
      )}

      {editingPerson && (
        <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              {editingPerson.id
                ? `Edit ${peopleLabel} member`
                : `New ${peopleLabel} member`}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setEditingPerson(null)}
            >
              Back to list
            </Button>
          </div>
          <Input
            label="Photo URL"
            value={editingPerson.image}
            onChange={(e) =>
              setEditingPerson({ ...editingPerson, image: e.target.value })
            }
            hint="Cloudinary or other https image URL"
            placeholder="https://res.cloudinary.com/..."
            required
          />
          <Input
            label="Name"
            value={editingPerson.name}
            onChange={(e) =>
              setEditingPerson({ ...editingPerson, name: e.target.value })
            }
            required
          />
          <Input
            label="Position"
            value={editingPerson.role}
            onChange={(e) =>
              setEditingPerson({ ...editingPerson, role: e.target.value })
            }
            placeholder="Executive Director & Co-Founder"
            required
          />
          <Input
            label="Location"
            value={editingPerson.location}
            onChange={(e) =>
              setEditingPerson({
                ...editingPerson,
                location: e.target.value,
              })
            }
            placeholder="Rubavu, Rwanda"
          />
          <TextArea
            label="Bio"
            rows={4}
            value={editingPerson.bio}
            onChange={(e) =>
              setEditingPerson({ ...editingPerson, bio: e.target.value })
            }
            required
          />
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={
                saving ||
                !editingPerson.name.trim() ||
                !editingPerson.role.trim() ||
                !editingPerson.image.trim() ||
                !editingPerson.bio.trim()
              }
              onClick={() => {
                const id =
                  editingPerson.id ||
                  slugify(editingPerson.name) ||
                  `member-${Date.now()}`;
                const nextItem: AboutPerson = {
                  ...editingPerson,
                  id,
                  imageAlt: `${editingPerson.name.trim()} portrait`,
                };
                const exists = currentPeople.some((item) => item.id === id);
                const next = exists
                  ? currentPeople.map((item) =>
                      item.id === id ? nextItem : item,
                    )
                  : [...currentPeople, nextItem];
                void savePeople(peopleTab, next);
              }}
            >
              {saving ? "Saving…" : "Save member"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingPerson(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {tab === "partners" && !editingPartner && (
        <div className="space-y-4">
          <div className="flex justify-between gap-3">
            <p className="text-sm text-muted">{partners.length} partner logos</p>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setMessage(null);
                setError(null);
                setEditingPartner(emptyPartner());
              }}
            >
              Add logo
            </Button>
          </div>

          <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
            {partners.map((partner) => (
              <li
                key={partner.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="flex items-center gap-3">
                  {partner.logo ? (
                    <div className="relative flex h-14 w-28 shrink-0 items-center justify-center rounded border border-border bg-white p-2">
                      <CmsImage
                        src={partner.logo}
                        alt=""
                        width={100}
                        height={40}
                        className="max-h-10 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-28 shrink-0 items-center justify-center rounded border border-dashed border-border text-xs text-muted">
                      No logo
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {partner.name?.trim() || "Unnamed partner"}
                    </p>
                    <p className="truncate text-sm text-muted">
                      {partner.type?.trim()
                        ? `${partner.type} · `
                        : ""}
                      {partner.href?.trim() || "No link yet"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setMessage(null);
                      setError(null);
                      setEditingPartner(partner);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      void savePartners(
                        partners.filter((item) => item.id !== partner.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
            {partners.length === 0 && (
              <li className="p-6 text-sm text-muted">No partner logos yet.</li>
            )}
          </ul>
        </div>
      )}

      {editingPartner && (
        <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              {editingPartner.id ? "Edit partner logo" : "New partner logo"}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setEditingPartner(null)}
            >
              Back to list
            </Button>
          </div>
          <Input
            label="Partner name"
            value={editingPartner.name}
            onChange={(e) =>
              setEditingPartner({ ...editingPartner, name: e.target.value })
            }
            placeholder="Yale University"
            required
          />
          <Input
            label="Logo URL"
            value={editingPartner.logo}
            onChange={(e) =>
              setEditingPartner({ ...editingPartner, logo: e.target.value })
            }
            hint="Cloudinary or other https image URL"
            placeholder="https://res.cloudinary.com/..."
            required
          />
          <Input
            label="Link URL (opens when logo is clicked)"
            value={editingPartner.href}
            onChange={(e) =>
              setEditingPartner({ ...editingPartner, href: e.target.value })
            }
            placeholder="https://partner.org"
            required
          />
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={
                saving ||
                !editingPartner.name.trim() ||
                !editingPartner.logo.trim() ||
                !editingPartner.href.trim()
              }
              onClick={() => {
                const id =
                  editingPartner.id ||
                  slugify(editingPartner.name) ||
                  `partner-${Date.now()}`;
                const nextItem: AboutPartner = {
                  ...editingPartner,
                  id,
                  name: editingPartner.name.trim(),
                  type: editingPartner.type || "",
                  description: editingPartner.description || "",
                };
                const exists = partners.some((item) => item.id === id);
                const next = exists
                  ? partners.map((item) =>
                      item.id === id ? nextItem : item,
                    )
                  : [...partners, nextItem];
                void savePartners(next);
              }}
            >
              {saving ? "Saving…" : "Save logo"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingPartner(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
