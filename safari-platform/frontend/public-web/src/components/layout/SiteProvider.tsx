"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/types/content";

const SiteContext = createContext<SiteSettings | null>(null);

export function SiteProvider({
  site,
  children,
}: {
  site: SiteSettings;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteSettings {
  const site = useContext(SiteContext);
  if (!site) {
    throw new Error("useSite must be used inside <SiteProvider>");
  }
  return site;
}

/** Optional for components that may render outside MarketingChrome. */
export function useSiteOptional(): SiteSettings | null {
  return useContext(SiteContext);
}
