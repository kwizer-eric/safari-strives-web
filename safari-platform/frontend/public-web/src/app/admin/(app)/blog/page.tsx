"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, PageHeader } from "@safari/ui";
import {
  listAdminCmsCollections,
  listAdminCmsPages,
} from "@/lib/cms";
import type { Article } from "@/types/content";

/**
 * Blog admin — reads the CMS `articles` collection (no static mock seed).
 * Full editor can be reconnected here; list is live from the database.
 */
export default function AdminBlogPage() {
  const { token } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const collections = await listAdminCmsCollections(token);
        const articlesCollection = collections.find((c) => c.key === "articles");
        const items =
          (articlesCollection?.payload as { items?: Article[] } | undefined)
            ?.items ?? [];
        setArticles(items);
        // Ensure home page exists too (sanity for Featured Insights).
        await listAdminCmsPages(token);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [token]);

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Field Notes articles from the CMS. Homepage Featured Insights shows the latest three."
      />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      {loading ? (
        <p className="text-sm text-muted">Loading articles…</p>
      ) : (
        <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-card">
          {articles.map((article) => (
            <li key={article.id} className="p-4">
              <p className="font-semibold text-foreground">{article.title}</p>
              <p className="text-xs text-muted">
                {article.date} · {article.category}
              </p>
              <p className="mt-1 text-sm text-muted line-clamp-2">
                {article.excerpt}
              </p>
            </li>
          ))}
          {articles.length === 0 && (
            <li className="p-6 text-sm text-muted">
              No articles in CMS. Seed with: python -m scripts.seed_cms_content
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
