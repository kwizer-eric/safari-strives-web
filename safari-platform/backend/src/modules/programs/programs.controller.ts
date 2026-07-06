import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { listPrograms } from "./programs.service";

export const programsRouter: Router = Router();

programsRouter.get("/", requireAuth, (_req, res) => {
  res.json({ programs: listPrograms() });
});
