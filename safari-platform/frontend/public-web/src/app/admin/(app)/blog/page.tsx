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
import type { Article, ArticleBlock, PressItem } from "@/types/content";
import { CmsImage } from "@/components/ui/CmsImage";
import {
  articleIsVideo,
  articlePosterUrl,
  articleYoutubeWatchUrl,
} from "@/lib/article-link";

type Tab = "articles" | "press";

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

const emptyPress = (): PressItem => ({
  id: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  image: "",
  imageAlt: "",
  href: "",
});

export default function AdminBlogPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("articles");
  const [articlesId, setArticlesId] = useState<number | null>(null);
  const [pressId, setPressId] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [editingPress, setEditingPress] = useState<PressItem | null>(null);
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
      const articlesCol = findCmsCollectionByKey<{ items: Article[] }>(
        collections,
        "articles",
      );
      const pressCol = findCmsCollectionByKey<{ items: PressItem[] }>(
        collections,
        "press",
      );
      if (!articlesCol) {
        throw new Error("Articles collection missing. Seed CMS content.");
      }
      if (!pressCol) {
        throw new Error(
          "Press collection missing. Run seed or create CMS key 'press'.",
        );
      }
      setArticlesId(articlesCol.id);
      setPressId(pressCol.id);
      setArticles(articlesCol.payload?.items ?? []);
      setPressItems(pressCol.payload?.items ?? []);
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
    if (!token || articlesId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, articlesId, {
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

  async function savePress(next: PressItem[]) {
    if (!token || pressId == null) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchAdminCmsCollection(token, pressId, {
        payload: { items: next },
      });
      setPressItems(next);
      setEditingPress(null);
      setMessage("Press items saved.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(article: Article) {
    setMessage(null);
    setError(null);
    setEditingPress(null);
    setEditing({
      ...article,
      videoUrl: article.videoUrl ?? "",
    });
    setBodyText(sectionsToParagraphs(article.sections));
    setShowPreview(false);
  }

  function startEditPress(item: PressItem) {
    setMessage(null);
    setError(null);
    setEditing(null);
    setBodyText("");
    setShowPreview(false);
    setEditingPress({ ...item });
  }

  const previewParagraphs = paragraphsToSections(bodyText);

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Insights"
          description="Manage Insights articles and Press coverage."
        />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Insights"
        description="Manage Insights articles and Press coverage."
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

      {!editing && !editingPress && (
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["articles", "Articles"],
              ["press", "Press"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={tab === id ? "primary" : "secondary"}
              onClick={() => {
                setTab(id);
                setMessage(null);
                setError(null);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {tab === "articles" && !editing && !editingPress && (
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
                    {articleIsVideo(article) ? " · Video" : ""}
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

      {tab === "press" && !editing && !editingPress && (
        <>
          <div className="mb-4 flex justify-between gap-3">
            <p className="text-sm text-muted">{pressItems.length} press items</p>
            <Button
              type="button"
              size="sm"
              onClick={() => startEditPress(emptyPress())}
            >
              Add press item
            </Button>
          </div>

          <ul className="mb-6 divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
            {pressItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-muted">
                      <CmsImage
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted">
                      {item.date}
                      {item.href ? ` · ${item.href}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => startEditPress(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      void savePress(
                        pressItems.filter((row) => row.id !== item.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
            {pressItems.length === 0 && (
              <li className="p-6 text-sm text-muted">No press items yet.</li>
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
              {articlePosterUrl(editing).trim() ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                  <CmsImage
                    src={articlePosterUrl(editing)}
                    alt={editing.imageAlt || editing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : null}
              {articleIsVideo(editing) ? (
                <p className="rounded-md bg-cream px-3 py-2 text-sm text-muted">
                  Opens on YouTube
                  {articleYoutubeWatchUrl(editing)
                    ? `: ${articleYoutubeWatchUrl(editing)}`
                    : ""}
                  . Body is optional for video cards.
                </p>
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
                  <p className="text-sm text-muted">
                    {articleIsVideo(editing)
                      ? "No body text — card will open YouTube."
                      : "No body text yet."}
                  </p>
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
                label="YouTube URL (optional)"
                value={editing.videoUrl ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, videoUrl: e.target.value })
                }
                hint="When set, the card opens this video on YouTube. Body is optional."
                placeholder="https://www.youtube.com/watch?v=… or video id"
              />
              <Input
                label="Cover image URL"
                value={editing.image}
                onChange={(e) =>
                  setEditing({ ...editing, image: e.target.value })
                }
                hint="Optional if YouTube is set — falls back to the video thumbnail"
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
                const videoUrl = (editing.videoUrl ?? "").trim();
                const nextItem: Article = {
                  ...editing,
                  id,
                  sections: paragraphsToSections(bodyText),
                  ...(videoUrl ? { videoUrl } : { videoUrl: undefined }),
                };
                if (!videoUrl) {
                  delete nextItem.videoUrl;
                }
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

      {editingPress && (
        <div className="max-w-2xl space-y-4 rounded-[var(--radius-card)] border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">
              {editingPress.id ? "Edit press item" : "New press item"}
            </h2>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setEditingPress(null)}
            >
              Back to list
            </Button>
          </div>
          <Input
            label="Cover image URL"
            value={editingPress.image}
            onChange={(e) =>
              setEditingPress({ ...editingPress, image: e.target.value })
            }
            hint="https image URL for the Press card"
            placeholder="https://res.cloudinary.com/..."
            required
          />
          <Input
            label="Image alt"
            value={editingPress.imageAlt}
            onChange={(e) =>
              setEditingPress({ ...editingPress, imageAlt: e.target.value })
            }
            placeholder={`${editingPress.title.trim() || "Press"} cover`}
          />
          <Input
            label="Date (YYYY-MM-DD)"
            value={editingPress.date}
            onChange={(e) =>
              setEditingPress({ ...editingPress, date: e.target.value })
            }
            required
          />
          <Input
            label="Title"
            value={editingPress.title}
            onChange={(e) =>
              setEditingPress({ ...editingPress, title: e.target.value })
            }
            required
          />
          <Input
            label="Article link"
            value={editingPress.href}
            onChange={(e) =>
              setEditingPress({ ...editingPress, href: e.target.value })
            }
            hint="Opens in a new tab when the card is clicked"
            placeholder="https://…"
            required
          />
          <div className="flex gap-3">
            <Button
              type="button"
              disabled={
                saving ||
                !editingPress.title.trim() ||
                !editingPress.image.trim() ||
                !editingPress.href.trim() ||
                !editingPress.date.trim()
              }
              onClick={() => {
                const id =
                  editingPress.id ||
                  slugify(editingPress.title) ||
                  `press-${Date.now()}`;
                const nextItem: PressItem = {
                  ...editingPress,
                  id,
                  title: editingPress.title.trim(),
                  date: editingPress.date.trim(),
                  image: editingPress.image.trim(),
                  imageAlt:
                    editingPress.imageAlt.trim() ||
                    `${editingPress.title.trim()} cover`,
                  href: editingPress.href.trim(),
                };
                const exists = pressItems.some((item) => item.id === id);
                const next = exists
                  ? pressItems.map((item) =>
                      item.id === id ? nextItem : item,
                    )
                  : [...pressItems, nextItem];
                void savePress(next);
              }}
            >
              {saving ? "Saving…" : "Save press item"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingPress(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
