import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { getSiteSettings } from "@/lib/content";

type MarketingChromeProps = {
  children: React.ReactNode;
  solid?: boolean;
};

export async function MarketingChrome({
  children,
  solid = false,
}: MarketingChromeProps) {
  const site = await getSiteSettings();

  return (
    <SiteProvider site={site}>
      <Header solid={solid} site={site} />
      {children}
      <Footer site={site} />
    </SiteProvider>
  );
}
