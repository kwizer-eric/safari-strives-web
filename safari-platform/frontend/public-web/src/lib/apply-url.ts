"use client";

import { useEffect, useState } from "react";
import { APPLY_URL_STORAGE_KEY } from "@/types/content";
import { useSiteOptional } from "@/components/layout/SiteProvider";

const FALLBACK_APPLY_URL = "/applicant/login";

export function readApplyUrl(defaultUrl?: string): string {
  const fallback = defaultUrl || FALLBACK_APPLY_URL;
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(APPLY_URL_STORAGE_KEY)?.trim();
  return stored || fallback;
}

export function writeApplyUrl(url: string) {
  window.localStorage.setItem(APPLY_URL_STORAGE_KEY, url.trim());
  window.dispatchEvent(new Event("safari-apply-url-changed"));
}

/** Live Apply Now destination (localStorage override, else CMS site.applyUrl). */
export function useApplyUrl() {
  const site = useSiteOptional();
  const defaultUrl = site?.applyUrl ?? FALLBACK_APPLY_URL;
  const [url, setUrl] = useState<string>(defaultUrl);

  useEffect(() => {
    function sync() {
      setUrl(readApplyUrl(defaultUrl));
    }
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("safari-apply-url-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("safari-apply-url-changed", sync);
    };
  }, [defaultUrl]);

  return url;
}

export function isExternalApplyUrl(url: string) {
  return /^https?:\/\//i.test(url);
}
