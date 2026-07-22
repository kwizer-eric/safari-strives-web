"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Input,
  PageHeader,
  Select,
  Table,
  TextArea,
  type TableColumn,
} from "@safari/ui";
import {
  articles,
  type Article,
  type ArticleBlock,
  type ArticleCategory,
} from "@/data/articles";
import { ArticleDetail } from "@/components/sections/ArticleDetail";

type BlogDraft = {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  status: "draft" | "published";
  coverImageUrl: string;
  imageAlt: string;
  date: string;
  readTime: string;
  sections: ArticleBlock[];
};

const categories: ArticleCategory[] = [
  "Ecosystem",
  "The Hub",
  "Ventures",
  "Green Lab",
  "Founder Story",
];

const blockTypeOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading", label: "Heading" },
  { value: "list", label: "Bullet list" },
  { value: "quote", label: "Quote" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toDraft(article: Article): BlogDraft {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    author: article.author,
    status: "published",
    coverImageUrl: article.image,
    imageAlt: article.imageAlt,
    date: article.date,
    readTime: article.readTime,
    sections: article.sections.map((block) => structuredClone(block)),
  };
}

function emptyBlock(type: ArticleBlock["type"]): ArticleBlock {
  switch (type) {
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "heading":
      return { type: "heading", id: "", level: 2, text: "" };
    case "list":
      return { type: "list", items: [""] };
    case "quote":
      return { type: "quote", text: "" };
  }
}

const emptyDraft = (): BlogDraft => ({
  id: "",
  title: "",
  excerpt: "",
  category: "Ecosystem",
  author: "Safari Strives Team",
  status: "draft",
  coverImageUrl: "",
  imageAlt: "",
  date: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  readTime: "5 min read",
  sections: [emptyBlock("paragraph")],
});

function blockLabel(block: ArticleBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return `Paragraph ${index + 1}`;
    case "heading":
      return `Heading H${block.level}`;
    case "list":
      return `Bullet list`;
    case "quote":
      return `Quote`;
  }
}

function draftToArticle(draft: BlogDraft): Article {
  return {
    id: draft.id || "preview",
    title: draft.title,
    excerpt: draft.excerpt,
    date: draft.date,
    image: draft.coverImageUrl,
    imageAlt: draft.imageAlt || draft.title || "Cover image",
    category: draft.category,
    author: draft.author,
    readTime: draft.readTime,
    sections: draft.sections.map((block) => {
      if (block.type === "heading") {
        return {
          ...block,
          id: block.id || slugify(block.text) || "section",
        };
      }
      if (block.type === "list") {
        return {
          ...block,
          items: block.items.map((item) => item.trim()).filter(Boolean),
        };
      }
      return block;
    }),
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogDraft[]>(() =>
    articles.map(toDraft),
  );
  const [editing, setEditing] = useState<BlogDraft | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!previewOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [previewOpen]);

  useEffect(() => {
    if (!previewOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPreviewOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen]);

  const columns: TableColumn<BlogDraft>[] = useMemo(
    () => [
      {
        key: "title",
        header: "Post",
        render: (post) => (
          <div className="max-w-md">
            <p className="font-semibold text-foreground">{post.title}</p>
            <p className="line-clamp-1 text-xs text-muted">{post.excerpt}</p>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        render: (post) => <Badge tone="neutral">{post.category}</Badge>,
      },
      {
        key: "sections",
        header: "Body",
        render: (post) => (
          <span className="text-sm text-muted">
            {post.sections.length} section{post.sections.length === 1 ? "" : "s"}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (post) => (
          <Badge tone={post.status === "published" ? "success" : "warning"}>
            {post.status}
          </Badge>
        ),
      },
      {
        key: "date",
        header: "Date",
        render: (post) => post.date,
      },
      {
        key: "actions",
        header: "",
        render: (post) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMessage(null);
                setEditing(structuredClone(post));
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setPosts((current) => current.filter((p) => p.id !== post.id));
                setMessage(`Removed “${post.title}”.`);
                if (editing?.id === post.id) setEditing(null);
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

  function updateSection(index: number, next: ArticleBlock) {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections.map((block, i) =>
        i === index ? next : block,
      ),
    });
  }

  function addSection(type: ArticleBlock["type"]) {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: [...editing.sections, emptyBlock(type)],
    });
  }

  function removeSection(index: number) {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections.filter((_, i) => i !== index),
    });
  }

  function moveSection(index: number, direction: -1 | 1) {
    if (!editing) return;
    const target = index + direction;
    if (target < 0 || target >= editing.sections.length) return;
    const sections = [...editing.sections];
    const [item] = sections.splice(index, 1);
    sections.splice(target, 0, item);
    setEditing({ ...editing, sections });
  }

  function savePost(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.title.trim()) {
      setMessage("Title is required.");
      return;
    }

    const id = editing.id || slugify(editing.title);
    const sections = editing.sections.map((block) => {
      if (block.type === "heading") {
        return {
          ...block,
          id: block.id || slugify(block.text) || "section",
        };
      }
      if (block.type === "list") {
        return {
          ...block,
          items: block.items.map((item) => item.trim()).filter(Boolean),
        };
      }
      return block;
    });

    const next: BlogDraft = {
      ...editing,
      id,
      imageAlt: editing.imageAlt || editing.title,
      sections,
    };

    setPosts((current) => {
      const exists = current.some((p) => p.id === id);
      if (exists) {
        return current.map((p) => (p.id === id ? next : p));
      }
      return [next, ...current];
    });
    setMessage(editing.id ? "Post updated." : "Post created.");
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Create and manage Field Notes posts. Form fields mirror the public article page."
        actions={
          <Button
            onClick={() => {
              setMessage(null);
              setEditing(emptyDraft());
            }}
          >
            New post
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
          onSubmit={savePost}
          className="mb-8 space-y-6 rounded-[var(--radius-card)] border border-border bg-card p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {editing.id ? "Edit post" : "New post"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Matches the article layout: date → title → excerpt → cover → body
              sections.
            </p>
          </div>

          {/* Header fields — same order as ArticleDetail */}
          <section className="space-y-4 border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Article header
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Date"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                hint="Shown above the title on the article page."
              />
              <Input
                label="Read time"
                value={editing.readTime}
                onChange={(e) =>
                  setEditing({ ...editing, readTime: e.target.value })
                }
                placeholder="5 min read"
              />
              <div className="md:col-span-2">
                <Input
                  label="Title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  required
                  hint="Main H1 on the article detail page."
                />
              </div>
              <div className="md:col-span-2">
                <TextArea
                  label="Excerpt"
                  value={editing.excerpt}
                  onChange={(e) =>
                    setEditing({ ...editing, excerpt: e.target.value })
                  }
                  rows={3}
                  hint="Short summary under the title — not the full article body."
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Cover image
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Cover image URL"
                value={editing.coverImageUrl}
                onChange={(e) =>
                  setEditing({ ...editing, coverImageUrl: e.target.value })
                }
                hint="Large hero image under the excerpt."
              />
              <Input
                label="Image alt text"
                value={editing.imageAlt}
                onChange={(e) =>
                  setEditing({ ...editing, imageAlt: e.target.value })
                }
              />
            </div>
            {editing.coverImageUrl ? (
              <div className="relative h-40 overflow-hidden rounded-xl border border-border bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editing.coverImageUrl}
                  alt={editing.imageAlt || "Cover preview"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </section>

          <section className="space-y-4 border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Meta
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Category"
                value={editing.category}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    category: e.target.value as ArticleCategory,
                  })
                }
                options={categories.map((c) => ({ value: c, label: c }))}
              />
              <Select
                label="Status"
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value as BlogDraft["status"],
                  })
                }
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                ]}
              />
              <Input
                label="Author"
                value={editing.author}
                onChange={(e) =>
                  setEditing({ ...editing, author: e.target.value })
                }
              />
            </div>
          </section>

          {/* Body sections — same block types as ArticleDetail */}
          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Article body
                </p>
                <p className="mt-1 text-sm text-muted">
                  Build the article like{" "}
                  <a
                    href="/field-notes/hub-launch"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    /field-notes/hub-launch
                  </a>
                  : paragraphs, H2/H3 headings, bullet lists, and quotes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {blockTypeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      addSection(option.value as ArticleBlock["type"])
                    }
                  >
                    + {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {editing.sections.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
                  No body sections yet. Add a paragraph to start.
                </p>
              ) : (
                editing.sections.map((block, index) => (
                  <div
                    key={`${block.type}-${index}`}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge tone="neutral">{blockLabel(block, index)}</Badge>
                        <span className="text-xs text-muted">
                          Section {index + 1}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => moveSection(index, -1)}
                          disabled={index === 0}
                        >
                          Up
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => moveSection(index, 1)}
                          disabled={index === editing.sections.length - 1}
                        >
                          Down
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSection(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    {block.type === "paragraph" && (
                      <TextArea
                        label="Paragraph text"
                        value={block.text}
                        onChange={(e) =>
                          updateSection(index, {
                            type: "paragraph",
                            text: e.target.value,
                          })
                        }
                        rows={4}
                        hint="Body copy under headings on the article page."
                      />
                    )}

                    {block.type === "heading" && (
                      <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                        <Select
                          label="Level"
                          value={String(block.level)}
                          onChange={(e) =>
                            updateSection(index, {
                              ...block,
                              level: Number(e.target.value) as 2 | 3,
                            })
                          }
                          options={[
                            { value: "2", label: "H2" },
                            { value: "3", label: "H3" },
                          ]}
                          hint="H2 = major section, H3 = subsection."
                        />
                        <Input
                          label="Heading text"
                          value={block.text}
                          onChange={(e) =>
                            updateSection(index, {
                              ...block,
                              text: e.target.value,
                              id: slugify(e.target.value),
                            })
                          }
                          hint="Appears as a section title in the article body."
                        />
                      </div>
                    )}

                    {block.type === "list" && (
                      <TextArea
                        label="List items"
                        value={block.items.join("\n")}
                        onChange={(e) =>
                          updateSection(index, {
                            type: "list",
                            items: e.target.value.split("\n"),
                          })
                        }
                        rows={5}
                        hint="One bullet per line."
                      />
                    )}

                    {block.type === "quote" && (
                      <TextArea
                        label="Quote"
                        value={block.text}
                        onChange={(e) =>
                          updateSection(index, {
                            type: "quote",
                            text: e.target.value,
                          })
                        }
                        rows={3}
                        hint="Rendered with a green left border on the article page."
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit">Save post</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setPreviewOpen(true)}
            >
              Preview article
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreviewOpen(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {previewOpen && editing && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-dark/50 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-preview-title"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative my-4 w-full max-w-5xl rounded-[var(--radius-card)] border border-border bg-background shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
              <div>
                <p
                  id="article-preview-title"
                  className="text-sm font-semibold text-foreground"
                >
                  Article preview
                </p>
                <p className="text-xs text-muted">
                  Public layout — not published until you save as published.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewOpen(false)}
                >
                  Back to edit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setPreviewOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="px-5 pb-8 md:px-8">
              <ArticleDetail article={draftToArticle(editing)} compact />
            </div>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        rows={posts}
        getRowKey={(post) => post.id}
        emptyMessage="No blog posts yet."
      />
    </div>
  );
}
