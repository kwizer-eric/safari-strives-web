"use client";

import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  Building2,
  Briefcase,
  Home,
  Link2,
  Mail,
} from "lucide-react";
import { RequireRole, useAuth } from "@safari/auth";
import { Sidebar, Button } from "@safari/ui";
import { initials } from "@safari/shared";

const items = [
  { label: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { label: "Home", href: "/admin/home", icon: Home },
  { label: "Application Link", href: "/admin/application-link", icon: Link2 },
  { label: "Our Model", href: "/admin/our-model", icon: BookOpen },
  { label: "Ventures", href: "/admin/ventures", icon: Briefcase },
  { label: "Insights", href: "/admin/blog", icon: Newspaper },
  { label: "About", href: "/admin/about", icon: Building2 },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireRole roles={["admin"]} loginPath="/admin/login">
      <AppShell>{children}</AppShell>
    </RequireRole>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title="Safari Admin"
        subtitle="Operations"
        items={items}
        footer={
          user && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-semibold text-white">
                  {initials(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={logout}>
                Sign out
              </Button>
            </div>
          )
        }
      />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
