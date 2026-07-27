"use client";

import { useSiteOptional } from "@/components/layout/SiteProvider";

/** Sitewide Apply destination. The CMS is the single source of truth. */
export function useApplyUrl() {
  const site = useSiteOptional();
  return site?.applyUrl?.trim() ?? "";
}

export function isExternalApplyUrl(url: string) {
  return /^https?:\/\//i.test(url);
}
