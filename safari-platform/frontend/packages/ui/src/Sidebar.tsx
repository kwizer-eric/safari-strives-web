"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@safari/shared";
import type { ComponentType } from "react";

export type SidebarItem = {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
};

type SidebarProps = {
  title: string;
  subtitle?: string;
  items: SidebarItem[];
  footer?: React.ReactNode;
};

export function Sidebar({ title, subtitle, items, footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-6">
        <p className="text-lg font-bold text-foreground">{title}</p>
        {subtitle && (
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">
            {subtitle}
          </p>
        )}
      </div>

      <nav aria-label="Sidebar" className="flex-1 overflow-y-auto p-4">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-white"
                      : "text-foreground/80 hover:bg-cream hover:text-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {footer && (
        <div className="border-t border-border p-4">{footer}</div>
      )}
    </aside>
  );
}
