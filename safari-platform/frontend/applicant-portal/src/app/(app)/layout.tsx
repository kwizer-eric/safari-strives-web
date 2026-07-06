"use client";

import {
  LayoutDashboard,
  BookOpen,
  FilePlus,
  User as UserIcon,
} from "lucide-react";
import { RequireRole, useAuth } from "@safari/auth";
import { Sidebar, TopBar, Button } from "@safari/ui";
import { initials } from "@safari/shared";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New application", href: "/apply", icon: FilePlus },
  { label: "Programs", href: "/programs", icon: BookOpen },
  { label: "Profile", href: "/profile", icon: UserIcon },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireRole roles={["applicant"]}>
      <AppShell>{children}</AppShell>
    </RequireRole>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen">
      <Sidebar
        title="Applicant"
        subtitle="Safari Strives"
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
        <TopBar>
          <p className="text-sm text-muted">
            Welcome back,{" "}
            <span className="font-medium text-foreground">
              {user?.name?.split(" ")[0] ?? ""}
            </span>
          </p>
        </TopBar>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
