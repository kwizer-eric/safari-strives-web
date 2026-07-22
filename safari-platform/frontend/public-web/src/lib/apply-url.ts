"use client";

import { useEffect, useState } from "react";
import { APPLY_URL_STORAGE_KEY, site } from "@/data/site";

export function readApplyUrl(): string {
  if (typeof window === "undefined") return site.applyUrl;
  const stored = window.localStorage.getItem(APPLY_URL_STORAGE_KEY)?.trim();
  return stored || site.applyUrl;
}

export function writeApplyUrl(url: string) {
  window.localStorage.setItem(APPLY_URL_STORAGE_KEY, url.trim());
  window.dispatchEvent(new Event("safari-apply-url-changed"));
}

/** Live Apply Now / Apply Here destination (admin-editable). */
export function useApplyUrl() {
  const [url, setUrl] = useState<string>(site.applyUrl);

  useEffect(() => {
    function sync() {
      setUrl(readApplyUrl());
    }
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("safari-apply-url-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("safari-apply-url-changed", sync);
    };
  }, []);

  return url;
}

export function isExternalApplyUrl(url: string) {
  return /^https?:\/\//i.test(url);
}
