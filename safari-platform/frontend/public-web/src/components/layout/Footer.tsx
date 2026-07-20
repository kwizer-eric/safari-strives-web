import Link from "next/link";
import { Container } from "@safari/ui";
import { footerColumns, footerSocial, site } from "@/data/site";

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
    <footer id="contact" className="relative z-10 bg-black text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xl font-bold">{site.name}</p>
            <p className="max-w-xs text-sm leading-relaxed text-white/90">
              {site.description}
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm text-white/90 md:mt-8">
              {site.locations.map((location) => (
                <p key={location}>{location}</p>
              ))}
            </div>
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

        <div className="mt-12 flex justify-end gap-6 border-t border-white/20 pt-6 md:mt-16">
          {footerSocial.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
