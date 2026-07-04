import Link from "next/link";
import { Container } from "@safari/ui";
import { footerColumns, site } from "@/data/site";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xl font-bold">{site.name}</p>
            <p className="max-w-xs text-sm leading-relaxed text-white/90">
              {site.description}
            </p>
          </div>

          <FooterColumn
            title={footerColumns.programs.title}
            links={footerColumns.programs.links}
          />
          <FooterColumn
            title={footerColumns.about.title}
            links={footerColumns.about.links}
          />
          <FooterColumn
            title={footerColumns.insights.title}
            links={footerColumns.insights.links}
          />
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1 text-sm text-white/90">
              {site.locations.map((location) => (
                <p key={location}>{location}</p>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </div>
            <p className="text-sm text-white/70">{site.legal}</p>
          </div>
          <p className="mt-6 text-sm text-white/60">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
