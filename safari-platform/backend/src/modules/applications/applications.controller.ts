import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth";
import { validateBody } from "@/middleware/validate";
import {
  createApplicationSchema,
  updateStatusSchema,
} from "./applications.schema";
import {
  createApplication,
  listApplications,
  listApplicationsForApplicant,
  submitApplication,
  updateStatus,
} from "./applications.service";

export const applicationsRouter: Router = Router();

applicationsRouter.get(
  "/",
  requireAuth,
  requireRole("admin"),
  (_req, res) => {
    res.json({ applications: listApplications() });
  },
);

applicationsRouter.get("/mine", requireAuth, (req, res) => {
  res.json({
    applications: listApplicationsForApplicant(req.user!.id),
  });
});

applicationsRouter.post(
  "/",
  requireAuth,
  requireRole("applicant"),
  validateBody(createApplicationSchema),
  async (req, res, next) => {
    try {
      const app = await createApplication(req.user!.id, req.body);
      res.status(201).json({ application: app });
    } catch (err) {
      next(err);
    }
  },
);

applicationsRouter.post(
  "/:id/submit",
  requireAuth,
  requireRole("applicant"),
  async (req, res, next) => {
    try {
      const app = await submitApplication(req.user!.id, req.params.id);
      res.json({ application: app });
    } catch (err) {
      next(err);
    }
  },
);

applicationsRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  validateBody(updateStatusSchema),
  async (req, res, next) => {
    try {
      const app = await updateStatus(req.params.id, req.body);
      res.json({ application: app });
    } catch (err) {
      next(err);
    }
  },
);
