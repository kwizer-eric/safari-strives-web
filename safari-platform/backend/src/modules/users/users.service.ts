import type { User } from "@safari/shared";
import { getDatabase } from "@/infrastructure/db";

export function listUsers(): User[] {
  const db = getDatabase();
  return Array.from(db.users.values()).map(({ passwordHash, ...u }) => {
    void passwordHash;
    return u;
  });
}
