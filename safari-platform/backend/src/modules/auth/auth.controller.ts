import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { validateBody } from "@/middleware/validate";
import { loginSchema } from "./auth.schema";
import { getCurrentUser, login } from "./auth.service";

export const authRouter: Router = Router();

authRouter.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const session = await login(req.body);
    res.json(session);
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", requireAuth, (req, res, next) => {
  try {
    const user = getCurrentUser(req.user!.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
});
