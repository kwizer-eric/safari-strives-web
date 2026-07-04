import { Router } from "express";
import { authRouter } from "@/modules/auth/auth.controller";
import { usersRouter } from "@/modules/users/users.controller";
import { applicationsRouter } from "@/modules/applications/applications.controller";
import { programsRouter } from "@/modules/programs/programs.controller";
import { sessionsRouter } from "@/modules/sessions/sessions.controller";
import { partnerProjectsRouter } from "@/modules/partner-projects/partner-projects.controller";
import { donationsRouter } from "@/modules/donations/donations.controller";

export function registerRoutes(): Router {
  const router = Router();
  router.get("/health", (_req, res) => {
    res.json({ ok: true, service: "safari-backend" });
  });
  router.use("/auth", authRouter);
  router.use("/users", usersRouter);
  router.use("/applications", applicationsRouter);
  router.use("/programs", programsRouter);
  router.use("/sessions", sessionsRouter);
  router.use("/partner-projects", partnerProjectsRouter);
  router.use("/donations", donationsRouter);
  return router;
}
