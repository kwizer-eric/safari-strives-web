import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth";
import { listUsers } from "./users.service";

export const usersRouter: Router = Router();

usersRouter.get("/", requireAuth, requireRole("admin"), (_req, res) => {
  res.json({ users: listUsers() });
});
