"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader, TextArea } from "@safari/ui";
import {
  findCmsCollectionByKey,
  listAdminCmsCollections,
  patchAdminCmsCollection,
  slugify,
} from "@/lib/cms";
import type { Article, ArticleBlock } from "@/types/content";
import { CmsImage } from "@/components/ui/CmsImage";

function paragraphsToSections(text: string): ArticleBlock[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({ type: "paragraph" as const, text: part }));
}

function sectionsToParagraphs(sections: ArticleBlock[]): string {
  return sections
    .filter((block): block is Extract<ArticleBlock, { type: "paragraph" }> =>
      block.type === "paragraph",
    )
    .map((block) => block.text)
    .join("\n\n");
}

const emptyArticle = (): Article => ({
  id: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  image: "",
  imageAlt: "",
  category: "Ecosystem",
  author: "",
  readTime: "5 min read",
  sections: [],
});

export default function AdminBlogPage() {
  const { token } = useAuth();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [bodyText, setBodyText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
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
        const collections = await listAdminCmsCollections(token);
      const col = findCmsCollectionByKey<{ items: Article[] }>(
        collections,
        "articles",
      );
      if (!col) throw new Error("Articles collection missing. Seed CMS content.");
      setCollectionId(col.id);
      setArticles(col.payload?.items ?? []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveArticles(next: Article[]) {
    if (!token || collectionId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, collectionId, {
        payload: { items: next },
      });
      setArticles(next);
      setEditing(null);
      setBodyText("");
      setShowPreview(false);
      setMessage("Articles saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(article: Article) {
    setMessage(null);
    setError(null);
    setEditing(article);
    setBodyText(sectionsToParagraphs(article.sections));
    setShowPreview(false);
  }

  const previewParagraphs = paragraphsToSections(bodyText);

  if (loading) {
    return (
      <div>
        <PageHeader title="Blog" description="Manage Field Notes articles." />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Create, edit, and preview Field Notes articles."
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
        <>
          <div className="mb-4 flex justify-between gap-3">
            <p className="text-sm text-muted">{articles.length} articles</p>
            <Button
              type="button"
              size="sm"
              onClick={() => startEdit(emptyArticle())}
            >
              Add article
            </Button>
          </div>

          <ul className="mb-6 divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
          {articles.map((article) => (
              <li
                key={article.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-semibold">{article.title}</p>
              <p className="text-xs text-muted">
                {article.date} · {article.category}
              </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(article)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      void saveArticles(
                        articles.filter((item) => item.id !== article.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
            </li>
          ))}
          {articles.length === 0 && (
              <li className="p-6 text-sm text-muted">No articles yet.</li>
            )}
          </ul>
        </>
      )}

      {editing && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">
              {editing.id ? "Edit article" : "New article"}
            </h2>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={showPreview ? "primary" : "secondary"}
                onClick={() => setShowPreview((open) => !open)}
              >
                {showPreview ? "Edit form" : "Preview"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setEditing(null);
                  setBodyText("");
                  setShowPreview(false);
                }}
              >
                Back to list
              </Button>
            </div>
          </div>

          {showPreview ? (
            <article className="max-w-3xl space-y-6 rounded-[var(--radius-card)] border border-border bg-card p-6 md:p-8">
              {editing.image.trim() ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                  <CmsImage
                    src={editing.image}
                    alt={editing.imageAlt || editing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {editing.category || "Category"} · {editing.date || "Date"}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                  {editing.title.trim() || "Untitled article"}
                </h1>
                <p className="mt-2 text-sm text-muted">
                  {editing.author.trim() || "Author"}
                  {editing.readTime ? ` · ${editing.readTime}` : ""}
                </p>
              </div>
              {editing.excerpt.trim() ? (
                <p className="text-lg leading-relaxed text-muted">
                  {editing.excerpt}
                </p>
              ) : null}
              <div className="space-y-4">
                {previewParagraphs.length > 0 ? (
                  previewParagraphs.map((block, index) =>
                    block.type === "paragraph" ? (
                      <p
                        key={`${index}-${block.text.slice(0, 24)}`}
                        className="text-base leading-relaxed text-foreground"
                      >
                        {block.text}
                      </p>
                    ) : null,
                  )
                ) : (
                  <p className="text-sm text-muted">No body text yet.</p>
                )}
              </div>
            </article>
          ) : (
            <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
              <Input
                label="Title"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
              />
              <TextArea
                label="Excerpt"
                rows={2}
                value={editing.excerpt}
                onChange={(e) =>
                  setEditing({ ...editing, excerpt: e.target.value })
                }
              />
              <Input
                label="Date (YYYY-MM-DD)"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />
              <Input
                label="Category"
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
              />
              <Input
                label="Author"
                value={editing.author}
                onChange={(e) =>
                  setEditing({ ...editing, author: e.target.value })
                }
              />
              <Input
                label="Read time"
                value={editing.readTime}
                onChange={(e) =>
                  setEditing({ ...editing, readTime: e.target.value })
                }
              />
              <Input
                label="Cover image URL"
                value={editing.image}
                onChange={(e) =>
                  setEditing({ ...editing, image: e.target.value })
                }
                hint="Cloudinary or other https image URL"
              />
              <Input
                label="Image alt"
                value={editing.imageAlt}
                onChange={(e) =>
                  setEditing({ ...editing, imageAlt: e.target.value })
                }
              />
              <TextArea
                label="Body (paragraphs separated by a blank line)"
                rows={12}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              disabled={saving || !editing.title.trim()}
              onClick={() => {
                const id =
                  editing.id ||
                  slugify(editing.title) ||
                  `article-${Date.now()}`;
                const nextItem: Article = {
                  ...editing,
                  id,
                  sections: paragraphsToSections(bodyText),
                };
                const exists = articles.some((item) => item.id === id);
                const next = exists
                  ? articles.map((item) => (item.id === id ? nextItem : item))
                  : [...articles, nextItem];
                void saveArticles(next);
              }}
            >
              {saving ? "Saving…" : "Save article"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditing(null);
                setBodyText("");
                setShowPreview(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
