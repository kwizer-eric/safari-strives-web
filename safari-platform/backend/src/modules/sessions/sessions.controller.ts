import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth";
import { listAllSessions, listSessionsForMentor } from "./sessions.service";

export const sessionsRouter: Router = Router();

sessionsRouter.get(
  "/mine",
  requireAuth,
  requireRole("mentor"),
  (req, res) => {
    res.json({ sessions: listSessionsForMentor(req.user!.id) });
  },
);

sessionsRouter.get("/", requireAuth, requireRole("admin"), (_req, res) => {
  res.json({ sessions: listAllSessions() });
});
