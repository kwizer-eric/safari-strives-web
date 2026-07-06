"use client";

import { Card, PageHeader } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatDate } from "@safari/shared";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Your account information on file."
      />
      <Card>
        {user ? (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Name
              </dt>
              <dd className="text-base font-semibold text-foreground">
                {user.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Email
              </dt>
              <dd className="text-base text-foreground">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Role
              </dt>
              <dd className="text-base text-foreground">{user.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                Joined
              </dt>
              <dd className="text-base text-foreground">
                {formatDate(user.createdAt)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">Loading...</p>
        )}
      </Card>
    </div>
  );
}
