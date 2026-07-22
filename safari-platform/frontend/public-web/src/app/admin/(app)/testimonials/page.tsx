"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Input,
  PageHeader,
  Table,
  TextArea,
  type TableColumn,
} from "@safari/ui";
import { testimonials as seedTestimonials } from "@/data/testimonials";

type TestimonialDraft = {
  id: string;
  name: string;
  position: string;
  company: string;
  review: string;
};

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

function toDraft(item: (typeof seedTestimonials)[number]): TestimonialDraft {
  const { position, company } = parseRole(item.role);
  return {
    id: item.id,
    name: item.name,
    position,
    company,
    review: item.quote,
  };
}

const emptyDraft = (): TestimonialDraft => ({
  id: "",
  name: "",
  position: "",
  company: "",
  review: "",
});

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialDraft[]>(() =>
    seedTestimonials.map(toDraft),
  );
  const [editing, setEditing] = useState<TestimonialDraft | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const columns: TableColumn<TestimonialDraft>[] = useMemo(
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
                setEditing(item);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setItems((current) =>
                  current.filter((entry) => entry.id !== item.id),
                );
                setMessage(`Removed ${item.name}.`);
                if (editing?.id === item.id) setEditing(null);
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

  function saveItem(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.name.trim() || !editing.review.trim()) {
      setMessage("Name and review are required.");
      return;
    }

    const id =
      editing.id || slugify(editing.name) || `testimonial-${Date.now()}`;
    const next: TestimonialDraft = { ...editing, id };

    setItems((current) => {
      const exists = current.some((entry) => entry.id === id);
      return exists
        ? current.map((entry) => (entry.id === id ? next : entry))
        : [...current, next];
    });
    setMessage(editing.id ? "Testimonial updated." : "Testimonial added.");
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Homepage testimonial marquee — name, position, place/company, and review."
        actions={
          <Button
            onClick={() => {
              setMessage(null);
              setEditing(emptyDraft());
            }}
          >
            Add testimonial
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
          onSubmit={saveItem}
          className="mb-8 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editing.id ? "Edit testimonial" : "New testimonial"}
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
              label="Position"
              value={editing.position}
              onChange={(e) =>
                setEditing({ ...editing, position: e.target.value })
              }
              placeholder="e.g. Founder"
            />
            <div className="md:col-span-2">
              <Input
                label="Place / company"
                value={editing.company}
                onChange={(e) =>
                  setEditing({ ...editing, company: e.target.value })
                }
                placeholder="e.g. Ukuri Fund"
              />
            </div>
            <div className="md:col-span-2">
              <TextArea
                label="Review"
                value={editing.review}
                onChange={(e) =>
                  setEditing({ ...editing, review: e.target.value })
                }
                rows={4}
                required
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit">Save testimonial</Button>
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
        rows={items}
        getRowKey={(item) => item.id}
        emptyMessage="No testimonials yet."
      />
    </div>
  );
}
