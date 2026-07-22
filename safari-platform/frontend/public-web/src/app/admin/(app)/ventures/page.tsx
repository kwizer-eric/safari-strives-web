"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Input,
  PageHeader,
  Table,
  type TableColumn,
} from "@safari/ui";
import { ventures as seedVentures, venturesPage } from "@/data/ventures";

type Venturist = {
  id: string;
  name: string;
  image: string;
  ventureName: string;
  pitchVideoUrl: string;
};

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

function toVenturist(venture: (typeof seedVentures)[number]): Venturist {
  return {
    id: venture.id,
    name: venture.founder,
    image: venture.image,
    ventureName: venture.ventureName,
    pitchVideoUrl: "",
  };
}

const emptyVenturist = (): Venturist => ({
  id: "",
  name: "",
  image: "",
  ventureName: "",
  pitchVideoUrl: "",
});

export default function AdminVenturesPage() {
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(
    venturesPage.heroVideo,
  );
  const [heroPosterUrl, setHeroPosterUrl] = useState<string>(
    venturesPage.heroImage,
  );
  const [venturists, setVenturists] = useState<Venturist[]>(() =>
    seedVentures.map(toVenturist),
  );
  const [editing, setEditing] = useState<Venturist | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const columns: TableColumn<Venturist>[] = useMemo(
    () => [
      {
        key: "person",
        header: "Venturist",
        render: (person) => (
          <div className="flex items-center gap-3">
            {person.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.image}
                alt={person.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-xs font-semibold text-muted">
                {person.name.slice(0, 1) || "?"}
              </span>
            )}
            <div>
              <p className="font-semibold text-foreground">{person.name}</p>
              <p className="text-xs text-muted">{person.ventureName}</p>
            </div>
          </div>
        ),
      },
      {
        key: "pitch",
        header: "Pitch video",
        render: (person) =>
          person.pitchVideoUrl ? (
            <a
              href={person.pitchVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {person.pitchVideoUrl.replace(/^https?:\/\//, "").slice(0, 42)}
              {person.pitchVideoUrl.length > 48 ? "…" : ""}
            </a>
          ) : (
            <span className="text-muted">Not set</span>
          ),
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
                setEditing(person);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setVenturists((current) =>
                  current.filter((item) => item.id !== person.id),
                );
                setMessage(`Removed ${person.name}.`);
                if (editing?.id === person.id) setEditing(null);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [editing?.id],
  );

  function saveHero(event: React.FormEvent) {
    event.preventDefault();
    setMessage("Hero video settings saved (local until CMS API is connected).");
  }

  function saveVenturist(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.name.trim() || !editing.ventureName.trim()) {
      setMessage("Name and venture name are required.");
      return;
    }

    const id =
      editing.id ||
      slugify(`${editing.name}-${editing.ventureName}`) ||
      `venturist-${Date.now()}`;
    const next: Venturist = { ...editing, id };

    setVenturists((current) => {
      const exists = current.some((item) => item.id === id);
      return exists
        ? current.map((item) => (item.id === id ? next : item))
        : [...current, next];
    });
    setMessage(editing.id ? "Venturist updated." : "Venturist added.");
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Ventures"
        description="Control the ventures page hero video and the people featured with their pitch videos."
        actions={
          <Button
            onClick={() => {
              setMessage(null);
              setEditing(emptyVenturist());
            }}
          >
            Add venturist
          </Button>
        }
      />

      {message && (
        <Alert tone="success" className="mb-6">
          {message}
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
          <a href="/ventures" className="text-accent hover:underline">
            /ventures
          </a>
          .
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Hero video URL"
            value={heroVideoUrl}
            onChange={(e) => setHeroVideoUrl(e.target.value)}
            placeholder="/videos/ventures-hero.mp4"
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

      {editing && (
        <form
          onSubmit={saveVenturist}
          className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editing.id ? "Edit venturist" : "New venturist"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
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
              label="Image URL"
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
              hint="Or upload an image below."
            />
            <Input
              label="Pitch video URL"
              value={editing.pitchVideoUrl}
              onChange={(e) =>
                setEditing({ ...editing, pitchVideoUrl: e.target.value })
              }
              placeholder="https://… or /videos/pitch.mp4"
              hint="Link to their pitch / founder video."
            />
            <div className="md:col-span-2">
              <Input
                label="Upload image"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const dataUrl = await fileToDataUrl(file);
                  setEditing((current) =>
                    current ? { ...current, image: dataUrl } : current,
                  );
                }}
              />
            </div>
            {editing.image ? (
              <div className="md:col-span-2">
                <p className="mb-2 text-sm font-medium text-foreground">
                  Image preview
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editing.image}
                  alt={editing.name || "Venturist"}
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save venturist</Button>
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

      <div className="mb-3">
        <h2 className="text-lg font-semibold text-foreground">Venturists</h2>
        <p className="text-sm text-muted">
          People featured on the ventures page — name, photo, venture, pitch
          video.
        </p>
      </div>

      <Table
        columns={columns}
        rows={venturists}
        getRowKey={(person) => person.id}
        emptyMessage="No venturists yet."
      />
    </div>
  );
}
