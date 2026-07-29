"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import {
  Alert,
  Badge,
  Button,
  Input,
  PageHeader,
  TextArea,
} from "@safari/ui";
import {
  getAdminProgramPage,
  listAdminProgramPages,
  putAdminProgramPage,
  type ProgramFeature,
  type ProgramPage,
  type ProgramPageSummary,
} from "@/lib/cms";

const SLUG_LABELS: Record<string, string> = {
  "our-model": "Venture Accelerator",
  "green-enterprise-lab": "Generative Enterprise Lab",
  "the-hub": "The Hub",
};

function emptyFeature(order: number): ProgramFeature {
  return {
    title: "",
    description: "",
    display_order: order,
    icon: null,
    image_url: null,
  };
}

function toReplaceBody(page: ProgramPage): Omit<ProgramPage, "id"> {
  const { id: _id, ...rest } = page;
  return {
    ...rest,
    features: page.features.map(({ id: _fid, ...feature }) => feature),
    sections: page.sections.map(({ id: _sid, ...section }) => section),
  };
}

export default function AdminProgramsPage() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState<ProgramPageSummary[]>([]);
  const [editing, setEditing] = useState<ProgramPage | null>(null);
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
      const data = await listAdminProgramPages(token);
      setPrograms(data);
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
      const page = await getAdminProgramPage(token, summary.id);
      setEditing(page);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingEdit(false);
    }
  }

  async function save() {
    if (!token || !editing) return;
    if (!editing.hero_title.trim() || !editing.closer_title.trim()) {
      setError("Hero title and closer title are required.");
      return;
    }
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const saved = await putAdminProgramPage(
        token,
        editing.id,
        toReplaceBody(editing),
      );
      setEditing(saved);
      setPrograms((prev) =>
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
      setMessage("Program page saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof ProgramPage>(
    key: K,
    value: ProgramPage[K],
  ) {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  }

  function updateFeature(index: number, patch: Partial<ProgramFeature>) {
    if (!editing) return;
    const features = editing.features.map((feature, i) =>
      i === index ? { ...feature, ...patch } : feature,
    );
    setEditing({ ...editing, features });
  }

  if (loading) {
    return (
        <div>
        <PageHeader
          title="Programs"
          description="Edit Venture Accelerator, Green Lab, and The Hub."
        />
        <p className="text-sm text-muted">Loading…</p>
        </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Full CRUD for typed program pages (hero, intro, features, closer)."
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
          {programs.map((program) => (
            <li
              key={program.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <p className="font-semibold">
                  {SLUG_LABELS[program.slug] ?? program.hero_title}
                </p>
                <p className="text-xs text-muted">/{program.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={program.is_published ? "success" : "warning"}>
                  {program.is_published ? "Published" : "Draft"}
                </Badge>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={loadingEdit}
                  onClick={() => void openEdit(program)}
                >
                  {loadingEdit ? "Loading…" : "Edit"}
                </Button>
              </div>
            </li>
          ))}
          {programs.length === 0 && (
            <li className="p-6 text-sm text-muted">
              No program pages yet. Seed with: python -m scripts.seed_program_pages
            </li>
          )}
        </ul>
      )}

      {editing && (
        <div className="max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {SLUG_LABELS[editing.slug] ?? editing.hero_title}
              </h2>
              <p className="text-sm text-muted">/{editing.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(null)}
              >
                Back to list
              </Button>
              <Button type="button" disabled={saving} onClick={() => void save()}>
                {saving ? "Saving…" : "Save program"}
              </Button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.is_published}
              onChange={(e) => updateField("is_published", e.target.checked)}
            />
            Published
          </label>

          <section className="space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h3 className="font-semibold">Hero</h3>
            <Input
              label="Eyebrow"
              value={editing.hero_eyebrow ?? ""}
              onChange={(e) => updateField("hero_eyebrow", e.target.value)}
            />
            <Input
              label="Title"
              value={editing.hero_title}
              onChange={(e) => updateField("hero_title", e.target.value)}
              required
            />
            <TextArea
              label="Subhead"
              rows={2}
              value={editing.hero_subhead ?? ""}
              onChange={(e) => updateField("hero_subhead", e.target.value)}
            />
            <TextArea
              label="Body"
              rows={3}
              value={editing.hero_body ?? ""}
              onChange={(e) => updateField("hero_body", e.target.value)}
            />
            <Input
              label="Hero video URL"
              value={editing.hero_video_url ?? ""}
              onChange={(e) => updateField("hero_video_url", e.target.value)}
            />
            <Input
              label="Media alt"
              value={editing.hero_media_alt ?? ""}
              onChange={(e) => updateField("hero_media_alt", e.target.value)}
            />
            <Input
              label="CTA label"
              value={editing.hero_cta_label ?? ""}
              onChange={(e) => updateField("hero_cta_label", e.target.value)}
            />
            <Input
              label="CTA link"
              value={editing.hero_cta_link ?? ""}
              onChange={(e) => updateField("hero_cta_link", e.target.value)}
            />
          </section>

          <section className="space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h3 className="font-semibold">Intro</h3>
            <Input
              label="Eyebrow"
              value={editing.intro_eyebrow ?? ""}
              onChange={(e) => updateField("intro_eyebrow", e.target.value)}
            />
            <Input
              label="Title"
              value={editing.intro_title ?? ""}
              onChange={(e) => updateField("intro_title", e.target.value)}
            />
            <TextArea
              label="Body"
              rows={4}
              value={editing.intro_body ?? ""}
              onChange={(e) => updateField("intro_body", e.target.value)}
            />
          </section>

          <section className="space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Features</h3>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() =>
                  setEditing({
                    ...editing,
                    features: [
                      ...editing.features,
                      emptyFeature(editing.features.length),
                    ],
                  })
                }
              >
                Add feature
              </Button>
            </div>
            <Input
              label="Features eyebrow"
              value={editing.features_eyebrow ?? ""}
              onChange={(e) => updateField("features_eyebrow", e.target.value)}
            />
            <Input
              label="Features title"
              value={editing.features_title ?? ""}
              onChange={(e) => updateField("features_title", e.target.value)}
            />
            {editing.features.map((feature, index) => (
              <div
                key={feature.id ?? `new-${index}`}
                className="space-y-3 rounded-lg border border-border p-4"
              >
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-medium">Feature {index + 1}</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        features: editing.features
                          .filter((_, i) => i !== index)
                          .map((item, i) => ({
                            ...item,
                            display_order: i,
                          })),
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  label="Title"
                  value={feature.title}
                  onChange={(e) =>
                    updateFeature(index, { title: e.target.value })
                  }
                />
                <TextArea
                  label="Description"
                  rows={3}
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, { description: e.target.value })
                  }
                />
                <Input
                  label="Image URL"
                  value={feature.image_url ?? ""}
                  onChange={(e) =>
                    updateFeature(index, { image_url: e.target.value || null })
                  }
                />
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h3 className="font-semibold">Closer</h3>
            <Input
              label="Eyebrow"
              value={editing.closer_eyebrow ?? ""}
              onChange={(e) => updateField("closer_eyebrow", e.target.value)}
            />
            <Input
              label="Title"
              value={editing.closer_title}
              onChange={(e) => updateField("closer_title", e.target.value)}
              required
            />
            <TextArea
              label="Body (use a blank line to split line1 / line2 on the site)"
              rows={3}
              value={editing.closer_body ?? ""}
              onChange={(e) => updateField("closer_body", e.target.value)}
            />
            <Input
              label="Primary CTA label"
              value={editing.closer_primary_cta_label ?? ""}
              onChange={(e) =>
                updateField("closer_primary_cta_label", e.target.value)
              }
            />
            <Input
              label="Primary CTA link"
              value={editing.closer_primary_cta_link ?? ""}
              onChange={(e) =>
                updateField("closer_primary_cta_link", e.target.value)
              }
            />
            <Input
              label="Secondary CTA label"
              value={editing.closer_secondary_cta_label ?? ""}
              onChange={(e) =>
                updateField("closer_secondary_cta_label", e.target.value)
              }
            />
            <Input
              label="Secondary CTA link"
              value={editing.closer_secondary_cta_link ?? ""}
              onChange={(e) =>
                updateField("closer_secondary_cta_link", e.target.value)
              }
            />
          </section>

          <div className="flex gap-3">
            <Button type="button" disabled={saving} onClick={() => void save()}>
              {saving ? "Saving…" : "Save program"}
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
