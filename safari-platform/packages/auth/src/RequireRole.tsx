"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@safari/shared";
import { useAuth } from "./AuthProvider";

type RequireRoleProps = {
  roles: UserRole[];
  children: React.ReactNode;
  loginPath?: string;
};

export function RequireRole({
  roles,
  children,
  loginPath = "/login",
}: RequireRoleProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(loginPath);
      return;
    }
    if (!roles.includes(user.role)) {
      router.replace(loginPath);
    }
  }, [loading, user, roles, router, loginPath]);

  if (loading || !user || !roles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
