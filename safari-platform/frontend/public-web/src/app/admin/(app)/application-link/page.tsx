"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader } from "@safari/ui";
import {
  findCmsCollectionByKey,
  listAdminCmsCollections,
  patchAdminCmsCollection,
} from "@/lib/cms";
import { isExternalApplyUrl } from "@/lib/apply-url";
import type { SiteSettings } from "@/types/content";

export default function ApplicationLinkPage() {
  const { token } = useAuth();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [sitePayload, setSitePayload] = useState<SiteSettings | null>(null);
  const [url, setUrl] = useState("");
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
      const site = findCmsCollectionByKey<SiteSettings>(collections, "site");
      if (!site?.payload) {
        throw new Error("Site collection missing. Seed CMS content.");
      }
      setCollectionId(site.id);
      setSitePayload(site.payload);
      setUrl(site.payload.applyUrl?.trim() ?? "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Initial data synchronization with the CMS API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!token || collectionId == null || !sitePayload) return;
    const next = url.trim();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload = { ...sitePayload, applyUrl: next };
      await patchAdminCmsCollection(token, collectionId, { payload });
      setSitePayload(payload);
      setMessage(
        next
          ? "Application link saved. All Apply Now / Apply Here CTAs use this URL."
          : "Application link cleared. Apply Now / Apply Here CTAs are disabled.",
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function clearLink() {
    if (!token || collectionId == null || !sitePayload) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload = { ...sitePayload, applyUrl: "" };
      await patchAdminCmsCollection(token, collectionId, { payload });
      setSitePayload(payload);
      setUrl("");
      setMessage("Application link cleared. Apply CTAs are disabled.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Application Link"
          description="Set the form URL used by Apply Now CTAs."
        />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Application Link"
        description="Saved in the CMS site collection (applyUrl), not only this browser. External form links open in a new tab."
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

      <form
        onSubmit={(e) => void save(e)}
        className="max-w-2xl rounded-[var(--radius-card)] border border-border bg-card p-6"
      >
        <Input
          label="Application form URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://forms.gle/…"
          hint="Google Form or internal path. Leave empty to disable Apply CTAs."
        />

        {url.trim() ? (
          <p className="mt-4 text-sm text-muted">
            Preview:{" "}
            <a
              href={url.trim()}
              target={isExternalApplyUrl(url.trim()) ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              {url.trim()}
            </a>
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save link"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={saving || !url.trim()}
            onClick={() => void clearLink()}
          >
            Clear link
          </Button>
        </div>
      </form>

      <div className="mt-8 max-w-2xl rounded-[var(--radius-card)] border border-border bg-background p-6">
        <h2 className="mb-2 text-sm font-semibold text-foreground">
          Where this link is used
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Navbar “Apply Now”</li>
          <li>Homepage final CTA “Apply Now”</li>
          <li>Ventures page “Apply Here”</li>
          <li>Venture Accelerator closer “Apply Here”</li>
          <li>Generative Enterprise Lab closer CTA</li>
          <li>The Hub closer CTA</li>
          <li>About page closer CTA</li>
        </ul>
      </div>
    </div>
  );
}
