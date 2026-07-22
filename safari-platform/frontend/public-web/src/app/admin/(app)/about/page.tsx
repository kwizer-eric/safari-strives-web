"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Input,
  PageHeader,
  Table,
  TextArea,
  type TableColumn,
} from "@safari/ui";
import {
  partners as seedPartners,
  teamMembers as seedTeam,
  aboutPage,
  type AboutPartner,
  type AboutPerson,
} from "@/data/about";

type AboutTab = "team" | "partners";

const emptyTeam = (): AboutPerson => ({
  id: "",
  name: "",
  role: "",
  bio: "",
  location: "",
  image: "",
  imageAlt: "",
});

const emptyPartner = (): AboutPartner => ({
  id: "",
  name: "",
  type: "Partner",
  description: "",
  logo: "",
  href: "",
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function AdminAboutPage() {
  const [tab, setTab] = useState<AboutTab>("team");
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(
    aboutPage.hero.heroVideo,
  );
  const [heroPosterUrl, setHeroPosterUrl] = useState<string>(
    aboutPage.hero.image,
  );
  const [team, setTeam] = useState<AboutPerson[]>(() => [...seedTeam]);
  const [partners, setPartners] = useState<AboutPartner[]>(() => [
    ...seedPartners,
  ]);
  const [editingTeam, setEditingTeam] = useState<AboutPerson | null>(null);
  const [editingPartner, setEditingPartner] = useState<AboutPartner | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);

  function saveHero(event: React.FormEvent) {
    event.preventDefault();
    setMessage("Hero video settings saved (local until CMS API is connected).");
  }

  const teamColumns: TableColumn<AboutPerson>[] = useMemo(
    () => [
      {
        key: "member",
        header: "Member",
        render: (person) => (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image}
              alt={person.imageAlt || person.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-foreground">{person.name}</p>
              <p className="text-xs text-muted">{person.role}</p>
            </div>
          </div>
        ),
      },
      {
        key: "location",
        header: "Location",
        render: (person) => person.location,
      },
      {
        key: "actions",
        header: "",
        render: (person) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditingPartner(null);
                setEditingTeam(person);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setTeam((current) =>
                  current.filter((member) => member.id !== person.id),
                );
                setMessage(`Removed ${person.name}.`);
                if (editingTeam?.id === person.id) setEditingTeam(null);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [editingTeam?.id],
  );

  const partnerColumns: TableColumn<AboutPartner>[] = useMemo(
    () => [
      {
        key: "partner",
        header: "Partner",
        render: (partner) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-16 items-center justify-center rounded border border-border bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-8 max-w-full object-contain"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">{partner.name}</p>
              <p className="text-xs text-muted">{partner.type}</p>
            </div>
          </div>
        ),
      },
      {
        key: "site",
        header: "Website",
        render: (partner) =>
          partner.href ? (
            <a
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {partner.href.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <span className="text-muted">—</span>
          ),
      },
      {
        key: "actions",
        header: "",
        render: (partner) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditingTeam(null);
                setEditingPartner(partner);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setPartners((current) =>
                  current.filter((item) => item.id !== partner.id),
                );
                setMessage(`Removed ${partner.name}.`);
                if (editingPartner?.id === partner.id) setEditingPartner(null);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [editingPartner?.id],
  );

  function saveTeam(event: React.FormEvent) {
    event.preventDefault();
    if (!editingTeam) return;
    if (!editingTeam.name.trim() || !editingTeam.role.trim()) {
      setMessage("Name and role are required.");
      return;
    }

    const id = editingTeam.id || slugify(editingTeam.name);
    const next: AboutPerson = {
      ...editingTeam,
      id,
      imageAlt: editingTeam.imageAlt || `${editingTeam.name} portrait`,
    };

    setTeam((current) => {
      const exists = current.some((member) => member.id === id);
      return exists
        ? current.map((member) => (member.id === id ? next : member))
        : [...current, next];
    });
    setMessage(editingTeam.id ? "Team member updated." : "Team member added.");
    setEditingTeam(null);
  }

  function savePartner(event: React.FormEvent) {
    event.preventDefault();
    if (!editingPartner) return;
    if (!editingPartner.name.trim()) {
      setMessage("Partner name is required.");
      return;
    }
    if (!editingPartner.logo.trim()) {
      setMessage("Add a logo URL or upload a logo file.");
      return;
    }

    const id = editingPartner.id || slugify(editingPartner.name);
    const next: AboutPartner = { ...editingPartner, id };

    setPartners((current) => {
      const exists = current.some((partner) => partner.id === id);
      return exists
        ? current.map((partner) => (partner.id === id ? next : partner))
        : [...current, next];
    });
    setMessage(editingPartner.id ? "Partner updated." : "Partner added.");
    setEditingPartner(null);
  }

  return (
    <div>
      <PageHeader
        title="About page"
        description="Control the about hero video, team members, and partner logos shown on /about."
        actions={
          tab === "team" ? (
            <Button
              onClick={() => {
                setMessage(null);
                setEditingPartner(null);
                setEditingTeam(emptyTeam());
              }}
            >
              Add team member
            </Button>
          ) : (
            <Button
              onClick={() => {
                setMessage(null);
                setEditingTeam(null);
                setEditingPartner(emptyPartner());
              }}
            >
              Add partner
            </Button>
          )
        }
      />

      {message && (
        <Alert tone="success" className="mb-6">
          {message} Changes are local until the CMS API is connected.
        </Alert>
      )}

      <form
        onSubmit={saveHero}
        className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
      >
        <h2 className="mb-1 text-lg font-semibold text-foreground">
          Page hero
        </h2>
        <p className="mb-4 text-sm text-muted">
          Background video on{" "}
          <a href="/about" className="text-accent hover:underline">
            /about
          </a>
          .
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Hero video URL"
            value={heroVideoUrl}
            onChange={(e) => setHeroVideoUrl(e.target.value)}
            placeholder="/videos/about-hero.mp4"
            hint="Path or full URL to the looping hero video."
            required
          />
          <Input
            label="Hero poster image URL"
            value={heroPosterUrl}
            onChange={(e) => setHeroPosterUrl(e.target.value)}
            hint="Shown before the video loads / as fallback."
          />
        </div>
        <div className="mt-6">
          <Button type="submit">Save hero</Button>
        </div>
      </form>

      <div className="mb-6 flex gap-2">
        <Button
          size="sm"
          variant={tab === "team" ? "primary" : "secondary"}
          onClick={() => setTab("team")}
        >
          Team members
          <Badge tone="neutral">{team.length}</Badge>
        </Button>
        <Button
          size="sm"
          variant={tab === "partners" ? "primary" : "secondary"}
          onClick={() => setTab("partners")}
        >
          Partners
          <Badge tone="neutral">{partners.length}</Badge>
        </Button>
      </div>

      {editingTeam && tab === "team" && (
        <form
          onSubmit={saveTeam}
          className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editingTeam.id ? "Edit team member" : "New team member"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              value={editingTeam.name}
              onChange={(e) =>
                setEditingTeam({ ...editingTeam, name: e.target.value })
              }
              required
            />
            <Input
              label="Role / title"
              value={editingTeam.role}
              onChange={(e) =>
                setEditingTeam({ ...editingTeam, role: e.target.value })
              }
              required
            />
            <Input
              label="Location"
              value={editingTeam.location}
              onChange={(e) =>
                setEditingTeam({ ...editingTeam, location: e.target.value })
              }
            />
            <Input
              label="Photo URL"
              value={editingTeam.image}
              onChange={(e) =>
                setEditingTeam({ ...editingTeam, image: e.target.value })
              }
              hint="Or upload a photo below."
            />
            <div className="md:col-span-2">
              <Input
                label="Upload photo"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const dataUrl = await fileToDataUrl(file);
                  setEditingTeam((current) =>
                    current
                      ? {
                          ...current,
                          image: dataUrl,
                          imageAlt: current.imageAlt || file.name,
                        }
                      : current,
                  );
                }}
              />
            </div>
            <div className="md:col-span-2">
              <TextArea
                label="Bio"
                value={editingTeam.bio}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, bio: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save member</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingTeam(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {editingPartner && tab === "partners" && (
        <form
          onSubmit={savePartner}
          className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editingPartner.id ? "Edit partner" : "New partner"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              value={editingPartner.name}
              onChange={(e) =>
                setEditingPartner({ ...editingPartner, name: e.target.value })
              }
              required
            />
            <Input
              label="Type"
              value={editingPartner.type}
              onChange={(e) =>
                setEditingPartner({ ...editingPartner, type: e.target.value })
              }
              hint="e.g. Academic partner, Local partner"
            />
            <Input
              label="Website URL"
              type="url"
              value={editingPartner.href}
              onChange={(e) =>
                setEditingPartner({ ...editingPartner, href: e.target.value })
              }
              placeholder="https://"
            />
            <Input
              label="Logo URL"
              value={editingPartner.logo}
              onChange={(e) =>
                setEditingPartner({ ...editingPartner, logo: e.target.value })
              }
              hint="Paste a link, or upload a logo file below."
            />
            <div className="md:col-span-2">
              <Input
                label="Upload logo"
                type="file"
                accept="image/*,.svg"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const dataUrl = await fileToDataUrl(file);
                  setEditingPartner((current) =>
                    current ? { ...current, logo: dataUrl } : current,
                  );
                }}
              />
            </div>
            {editingPartner.logo ? (
              <div className="md:col-span-2">
                <p className="mb-2 text-sm font-medium text-foreground">
                  Logo preview
                </p>
                <div className="flex h-20 w-48 items-center justify-center rounded-[var(--radius-card)] border border-border bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editingPartner.logo}
                    alt={`${editingPartner.name || "Partner"} logo preview`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ) : null}
            <div className="md:col-span-2">
              <TextArea
                label="Description"
                value={editingPartner.description}
                onChange={(e) =>
                  setEditingPartner({
                    ...editingPartner,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save partner</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingPartner(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {tab === "team" ? (
        <Table
          columns={teamColumns}
          rows={team}
          getRowKey={(person) => person.id}
          emptyMessage="No team members yet."
        />
      ) : (
        <Table
          columns={partnerColumns}
          rows={partners}
          getRowKey={(partner) => partner.id}
          emptyMessage="No partners yet."
        />
      )}
    </div>
  );
}
