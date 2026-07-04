"use client";

import { useEffect, useState } from "react";
import type { User } from "@safari/shared";
import { Alert, Badge, PageHeader, Table, type TableColumn } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { formatDate } from "@safari/shared";

export default function UsersPage() {
  const { api } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.users
      .list()
      .then((res) => setUsers(res.users))
      .catch((err) => setError((err as Error).message));
  }, [api]);

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      render: (u) => (
        <div>
          <p className="font-semibold text-foreground">{u.name}</p>
          <p className="text-xs text-muted">{u.email}</p>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (u) => <Badge>{u.role}</Badge> },
    {
      key: "created",
      header: "Joined",
      render: (u) => formatDate(u.createdAt),
    },
  ];

  return (
    <div>
      <PageHeader title="Users" description="Everyone on the platform." />
      {error && (
        <Alert tone="danger" className="mb-6">
          {error}
        </Alert>
      )}
      <Table columns={columns} rows={users} getRowKey={(u) => u.id} />
    </div>
  );
}
