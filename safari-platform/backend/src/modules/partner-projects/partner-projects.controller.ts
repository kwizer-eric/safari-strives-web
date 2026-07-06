import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth";
import {
  listAllPartnerProjects,
  listPartnerProjects,
} from "./partner-projects.service";

export const partnerProjectsRouter: Router = Router();

partnerProjectsRouter.get(
  "/mine",
  requireAuth,
  requireRole("partner"),
  (req, res) => {
    res.json({ projects: listPartnerProjects(req.user!.id) });
  },
);

partnerProjectsRouter.get(
  "/",
  requireAuth,
  requireRole("admin"),
  (_req, res) => {
    res.json({ projects: listAllPartnerProjects() });
  },
);
