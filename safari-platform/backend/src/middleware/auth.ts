import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "@safari/shared";
import { env } from "@/config/env";
import { ForbiddenError, UnauthorizedError } from "@/common/errors";
import type { AuthenticatedUser } from "@/common/types";

type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export function signToken(user: {
  id: string;
  email: string;
  role: UserRole;
}): string {
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthenticatedUser {
  const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  return { id: payload.sub, email: payload.email, role: payload.role };
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(new UnauthorizedError("Missing bearer token"));
    return;
  }
  const token = header.slice("Bearer ".length).trim();
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
}
