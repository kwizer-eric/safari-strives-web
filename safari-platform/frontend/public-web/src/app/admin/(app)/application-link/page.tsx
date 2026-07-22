"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Input, PageHeader } from "@safari/ui";
import { site } from "@/data/site";
import {
  isExternalApplyUrl,
  readApplyUrl,
  writeApplyUrl,
} from "@/lib/apply-url";

export default function ApplicationLinkPage() {
  const [url, setUrl] = useState<string>(site.applyUrl);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUrl(readApplyUrl());
  }, []);

  function save(event: React.FormEvent) {
    event.preventDefault();
    const next = url.trim();
    if (!next) {
      setMessage("Enter an application URL.");
      return;
    }
    writeApplyUrl(next);
    setMessage(
      "Application link saved. All Apply Now / Apply Here CTAs now use this URL.",
    );
  }

  function resetDefault() {
    writeApplyUrl(site.applyUrl);
    setUrl(site.applyUrl);
    setMessage("Reset to the default site apply URL.");
  }

  return (
    <div>
      <PageHeader
        title="Application Link"
        description="Set the external form link used by every Apply Now / Apply Here CTA across the public site."
      />

      {message && (
        <Alert tone="success" className="mb-6">
          {message}
        </Alert>
      )}

      <form
        onSubmit={save}
        className="max-w-2xl rounded-[var(--radius-card)] border border-border bg-card p-6"
      >
        <Input
          label="Application form URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://forms.gle/…"
          hint="Usually a Google Form. External links open in a new tab."
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
          <Button type="submit">Save link</Button>
          <Button type="button" variant="secondary" onClick={resetDefault}>
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
