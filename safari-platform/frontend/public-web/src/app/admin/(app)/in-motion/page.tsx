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
import { home } from "@/data/home";

type InMotionCard = {
  id: string;
  name: string;
  image: string;
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

const emptyCard = (): InMotionCard => ({
  id: "",
  name: "",
  image: "",
});

export default function AdminInMotionPage() {
  const [cards, setCards] = useState<InMotionCard[]>(() =>
    home.inMotion.cards.map((card) => ({
      id: card.id,
      name: card.label,
      image: card.image,
    })),
  );
  const [editing, setEditing] = useState<InMotionCard | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const columns: TableColumn<InMotionCard>[] = useMemo(
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
                alt={card.name}
                className="h-12 w-16 rounded-lg object-cover"
              />
            ) : (
              <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-cream text-xs text-muted">
                No image
              </span>
            )}
            <p className="font-semibold text-foreground">{card.name}</p>
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
                setEditing(card);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setCards((current) =>
                  current.filter((item) => item.id !== card.id),
                );
                setMessage(`Removed “${card.name}”.`);
                if (editing?.id === card.id) setEditing(null);
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

  function saveCard(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.name.trim()) {
      setMessage("Name is required.");
      return;
    }
    if (!editing.image.trim()) {
      setMessage("Add an image URL or upload an image.");
      return;
    }

    const id = editing.id || slugify(editing.name) || `in-motion-${Date.now()}`;
    const next: InMotionCard = { ...editing, id };

    setCards((current) => {
      const exists = current.some((item) => item.id === id);
      return exists
        ? current.map((item) => (item.id === id ? next : item))
        : [...current, next];
    });
    setMessage(editing.id ? "Card updated." : "Card added.");
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="In Motion"
        description="Homepage marquee cards — name and image only."
        actions={
          <Button
            onClick={() => {
              setMessage(null);
              setEditing(emptyCard());
            }}
          >
            Add card
          </Button>
        }
      />

      {message && (
        <Alert tone="success" className="mb-6">
          {message} Changes are local until the CMS API is connected.
        </Alert>
      )}

      {editing && (
        <form
          onSubmit={saveCard}
          className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editing.id ? "Edit card" : "New card"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              required
              hint="Label shown on the In Motion card."
            />
            <Input
              label="Image URL"
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
              hint="Or upload an image below."
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
                  alt={editing.name || "In Motion card"}
                  className="h-36 w-56 rounded-xl object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save card</Button>
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

      <Table
        columns={columns}
        rows={cards}
        getRowKey={(card) => card.id}
        emptyMessage="No In Motion cards yet."
      />
    </div>
  );
}
