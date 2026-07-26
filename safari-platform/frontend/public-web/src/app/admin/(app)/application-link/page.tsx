"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@safari/auth";
import { Alert, Button, Input, PageHeader } from "@safari/ui";
import {
  findCmsCollectionByKey,
  listAdminCmsCollections,
  patchAdminCmsCollection,
} from "@/lib/cms";
import {
  isExternalApplyUrl,
  writeApplyUrl,
} from "@/lib/apply-url";
import type { SiteSettings } from "@/types/content";

const DEFAULT_APPLY_URL = "/applicant/login";

export default function ApplicationLinkPage() {
  const { token } = useAuth();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [sitePayload, setSitePayload] = useState<SiteSettings | null>(null);
  const [url, setUrl] = useState(DEFAULT_APPLY_URL);
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
      const fromCms = site.payload.applyUrl?.trim() || DEFAULT_APPLY_URL;
      setUrl(fromCms);
      // Keep browser override in sync so Apply Now picks it up immediately.
      writeApplyUrl(fromCms);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!token || collectionId == null || !sitePayload) return;
    const next = url.trim();
    if (!next) {
      setError("Enter an application URL.");
      return;
    }
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload = { ...sitePayload, applyUrl: next };
      await patchAdminCmsCollection(token, collectionId, { payload });
      setSitePayload(payload);
      writeApplyUrl(next);
      setMessage(
        "Application link saved to CMS. All Apply Now / Apply Here CTAs use this URL.",
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function resetDefault() {
    if (!token || collectionId == null || !sitePayload) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const payload = { ...sitePayload, applyUrl: DEFAULT_APPLY_URL };
      await patchAdminCmsCollection(token, collectionId, { payload });
      setSitePayload(payload);
      setUrl(DEFAULT_APPLY_URL);
      writeApplyUrl(DEFAULT_APPLY_URL);
      setMessage("Reset to the default apply URL and saved to CMS.");
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
          placeholder="https://forms.gle/… or /applicant/login"
          hint="Google Form or internal path. Stored as site.applyUrl in the CMS."
          required
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
            disabled={saving}
            onClick={() => void resetDefault()}
          >
            Reset to default
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
          <li>Green Enterprise Lab closer CTA</li>
          <li>The Hub closer CTA</li>
          <li>About page closer CTA</li>
        </ul>
      </div>
    </div>
  );
}
