import bcrypt from "bcryptjs";
import type { AuthSession, User } from "@safari/shared";
import { UnauthorizedError } from "@/common/errors";
import { getDatabase } from "@/infrastructure/db";
import { signToken } from "@/middleware/auth";
import type { LoginInput } from "./auth.schema";

function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  role: User["role"];
  createdAt: string;
}): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function login(input: LoginInput): Promise<AuthSession> {
  const db = getDatabase();
  const stored = Array.from(db.users.values()).find(
    (u) => u.email.toLowerCase() === input.email.toLowerCase(),
  );
  if (!stored) throw new UnauthorizedError("Invalid credentials");

  const ok = await bcrypt.compare(input.password, stored.passwordHash);
  if (!ok) throw new UnauthorizedError("Invalid credentials");

  const user = toPublicUser(stored);
  const token = signToken(stored);
  return { token, user };
}

export function getCurrentUser(id: string): User {
  const db = getDatabase();
  const stored = db.users.get(id);
  if (!stored) throw new UnauthorizedError();
  return toPublicUser(stored);
}
