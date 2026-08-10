"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader, TextArea } from "@safari/ui";
import {
  findCmsPageBySlug,
  listAdminCmsPages,
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
  linkedin: "",
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

// Fetch team members from database endpoint
async function listAdminTeam(token: string): Promise<AboutPerson[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/admin/people/team`,
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
  // Map database records to AboutPerson format
  return members.map(
    (m: {
      id: number;
      name: string;
      title?: string;
      bio?: string;
      photo_url?: string;
      linkedin_url?: string;
    }) => ({
      id: String(m.id),
      name: m.name,
      role: m.title || "",
      bio: m.bio || "",
      location: "",
      image: m.photo_url || "",
      imageAlt: m.name,
      linkedin: m.linkedin_url || "",
      featured: false,
    })
  );
}

// Fetch board members from database endpoint
async function listAdminBoard(token: string): Promise<AboutPerson[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/admin/people/board`,
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
  // Map database records to AboutPerson format
  return members.map(
    (m: {
      id: number;
      name: string;
      title?: string;
      bio?: string;
      photo_url?: string;
      linkedin_url?: string;
    }) => ({
      id: String(m.id),
      name: m.name,
      role: m.title || "",
      bio: m.bio || "",
      location: "",
      image: m.photo_url || "",
      imageAlt: m.name,
      linkedin: m.linkedin_url || "",
      featured: false,
    })
  );
}

export default function AdminAboutPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("hero");
  const [pageId, setPageId] = useState<number | null>(null);
  const [payload, setPayload] = useState<AboutPagePayload | null>(null);
  const [heroKind, setHeroKind] = useState<HeroMediaKind>("photo");
  const [board, setBoard] = useState<AboutPerson[]>([]);
  const [team, setTeam] = useState<AboutPerson[]>([]);
  const [partners, setPartners] = useState<AboutPartner[]>([]);
  const [editingPerson, setEditingPerson] = useState<AboutPerson | null>(null);
  const [editingPartner, setEditingPartner] = useState<AboutPartner | null>(
    null
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
      const pages = await listAdminCmsPages(token);
      const about = findCmsPageBySlug<AboutPagePayload>(pages, "about");
      if (!about?.payload) {
        throw new Error("About CMS page not found. Seed CMS content.");
      }
      setPageId(about.id);
      setPayload(about.payload);
      setHeroKind(heroMediaKind(about.payload));

      // Fetch team and board from database endpoints instead of CMS
      const [teamMembers, boardMembers] = await Promise.all([
        listAdminTeam(token),
        listAdminBoard(token),
      ]);

      setTeam(teamMembers);
      setBoard(boardMembers);

      // Partners still come from CMS for now
      setPartners([]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const savePage = useCallback(async () => {
    if (!token || pageId === null || !payload) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsPage(token, pageId, payload);
      setMessage("Page saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }, [token, pageId, payload]);

  const addPerson = (peopleTab: PeopleTab) => {
    const newPerson = { ...emptyPerson(), id: crypto.randomUUID() };
    if (peopleTab === "board") {
      setBoard([...board, newPerson]);
    } else {
      setTeam([...team, newPerson]);
    }
    setEditingPerson(newPerson);
  };

  const updatePerson = (person: AboutPerson, peopleTab: PeopleTab) => {
    if (peopleTab === "board") {
      setBoard(board.map((p) => (p.id === person.id ? person : p)));
    } else {
      setTeam(team.map((p) => (p.id === person.id ? person : p)));
    }
  };

  const removePerson = (id: string, peopleTab: PeopleTab) => {
    if (peopleTab === "board") {
      setBoard(board.filter((p) => p.id !== id));
    } else {
      setTeam(team.filter((p) => p.id !== id));
    }
  };

  const addPartner = () => {
    const newPartner = { ...emptyPartner(), id: crypto.randomUUID() };
    setPartners([...partners, newPartner]);
    setEditingPartner(newPartner);
  };

  const updatePartner = (partner: AboutPartner) => {
    setPartners(partners.map((p) => (p.id === partner.id ? partner : p)));
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
  };

  const saveChanges = async () => {
    if (!token || pageId === null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      // Save page payload (hero section)
      if (payload) {
        await patchAdminCmsPage(token, pageId, payload);
      }
      setMessage("All changes saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error && !payload)
    return <Alert tone="danger">{error}</Alert>;

  return (
    <div>
      <PageHeader
        title="About Page"
        description="Manage hero, team, board, and partners sections."
      />

      {message && (
        <Alert tone="positive" className="mb-6">
          {message}
        </Alert>
      )}
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="mb-6 flex gap-2 border-b border-border">
        {(["hero", "team", "board", "partners"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t
                ? "border-b-2 border-accent text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {tab === "hero" && payload && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Hero Video URL</label>
            <Input
              type="text"
              value={payload.hero.heroVideo || ""}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, heroVideo: e.target.value },
                })
              }
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-muted">
              {mediaUrlValidationMessage}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">Hero Image URL</label>
            <Input
              type="text"
              value={payload.hero.image || ""}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, image: e.target.value },
                })
              }
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Eyebrow</label>
            <Input
              type="text"
              value={payload.hero.eyebrow || ""}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, eyebrow: e.target.value },
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Headline</label>
            <Input
              type="text"
              value={payload.hero.headline?.line1 || ""}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: {
                    ...payload.hero,
                    headline: { line1: e.target.value, line2: payload.hero.headline?.line2 || "" },
                  },
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Subheadline</label>
            <TextArea
              value={payload.hero.subhead || ""}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  hero: { ...payload.hero, subhead: e.target.value },
                })
              }
            />
          </div>

          <Button onClick={savePage} disabled={saving}>
            {saving ? "Saving..." : "Save Hero"}
          </Button>
        </div>
      )}

      {/* Team Section */}
      {tab === "team" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Team Members ({team.length})</h3>
            <Button onClick={() => addPerson("team")}>Add Member</Button>
          </div>

          {team.length === 0 ? (
            <p className="text-sm text-muted">No team members yet.</p>
          ) : (
            <div className="space-y-4">
              {team.map((person) => (
                <div
                  key={person.id}
                  className="rounded border border-border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted">{person.role}</p>
                    </div>
                    <button
                      onClick={() => removePerson(person.id, "team")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  {editingPerson?.id === person.id && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      <Input
                        label="Name"
                        value={person.name}
                        onChange={(e) =>
                          updatePerson({ ...person, name: e.target.value }, "team")
                        }
                      />
                      <Input
                        label="Role/Title"
                        value={person.role}
                        onChange={(e) =>
                          updatePerson({ ...person, role: e.target.value }, "team")
                        }
                      />
                      <TextArea
                        label="Bio"
                        value={person.bio}
                        onChange={(e) =>
                          updatePerson({ ...person, bio: e.target.value }, "team")
                        }
                      />
                      <Input
                        label="Photo URL"
                        value={person.image}
                        onChange={(e) =>
                          updatePerson({ ...person, image: e.target.value }, "team")
                        }
                      />
                      <Input
                        label="LinkedIn URL"
                        value={person.linkedin}
                        onChange={(e) =>
                          updatePerson({ ...person, linkedin: e.target.value }, "team")
                        }
                      />
                      <Button
                        onClick={() => setEditingPerson(null)}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                  {editingPerson?.id !== person.id && (
                    <button
                      onClick={() => setEditingPerson(person)}
                      className="mt-2 text-xs text-accent hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button onClick={saveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Team"}
          </Button>
        </div>
      )}

      {/* Board Section */}
      {tab === "board" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Board Members ({board.length})</h3>
            <Button onClick={() => addPerson("board")}>Add Member</Button>
          </div>

          {board.length === 0 ? (
            <p className="text-sm text-muted">No board members yet.</p>
          ) : (
            <div className="space-y-4">
              {board.map((person) => (
                <div
                  key={person.id}
                  className="rounded border border-border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted">{person.role}</p>
                    </div>
                    <button
                      onClick={() => removePerson(person.id, "board")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  {editingPerson?.id === person.id && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      <Input
                        label="Name"
                        value={person.name}
                        onChange={(e) =>
                          updatePerson({ ...person, name: e.target.value }, "board")
                        }
                      />
                      <Input
                        label="Role/Title"
                        value={person.role}
                        onChange={(e) =>
                          updatePerson({ ...person, role: e.target.value }, "board")
                        }
                      />
                      <TextArea
                        label="Bio"
                        value={person.bio}
                        onChange={(e) =>
                          updatePerson({ ...person, bio: e.target.value }, "board")
                        }
                      />
                      <Input
                        label="Photo URL"
                        value={person.image}
                        onChange={(e) =>
                          updatePerson({ ...person, image: e.target.value }, "board")
                        }
                      />
                      <Input
                        label="LinkedIn URL"
                        value={person.linkedin}
                        onChange={(e) =>
                          updatePerson({ ...person, linkedin: e.target.value }, "board")
                        }
                      />
                      <Button
                        onClick={() => setEditingPerson(null)}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                  {editingPerson?.id !== person.id && (
                    <button
                      onClick={() => setEditingPerson(person)}
                      className="mt-2 text-xs text-accent hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button onClick={saveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Board"}
          </Button>
        </div>
      )}

      {/* Partners Section */}
      {tab === "partners" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Partners ({partners.length})</h3>
            <Button onClick={addPartner}>Add Partner</Button>
          </div>

          {partners.length === 0 ? (
            <p className="text-sm text-muted">No partners yet.</p>
          ) : (
            <div className="space-y-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="rounded border border-border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted">{partner.type}</p>
                    </div>
                    <button
                      onClick={() => removePartner(partner.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  {editingPartner?.id === partner.id && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      <Input
                        label="Name"
                        value={partner.name}
                        onChange={(e) =>
                          updatePartner({ ...partner, name: e.target.value })
                        }
                      />
                      <Input
                        label="Type"
                        value={partner.type}
                        onChange={(e) =>
                          updatePartner({ ...partner, type: e.target.value })
                        }
                      />
                      <Input
                        label="Logo URL"
                        value={partner.logo}
                        onChange={(e) =>
                          updatePartner({ ...partner, logo: e.target.value })
                        }
                      />
                      <TextArea
                        label="Description"
                        value={partner.description}
                        onChange={(e) =>
                          updatePartner({ ...partner, description: e.target.value })
                        }
                      />
                      <Input
                        label="Website URL"
                        value={partner.href}
                        onChange={(e) =>
                          updatePartner({ ...partner, href: e.target.value })
                        }
                      />
                      <Button
                        onClick={() => setEditingPartner(null)}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                  {editingPartner?.id !== partner.id && (
                    <button
                      onClick={() => setEditingPartner(partner)}
                      className="mt-2 text-xs text-accent hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button onClick={saveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Partners"}
          </Button>
        </div>
      )}
    </div>
  );
}
