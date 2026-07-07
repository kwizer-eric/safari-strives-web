import { Router } from "express";
import { logger } from "@/common/logger";
import { validateBody } from "@/middleware/validate";
import { donationSchema } from "./donations.schema";

export const donationsRouter: Router = Router();

donationsRouter.post(
  "/",
  validateBody(donationSchema),
  async (req, res) => {
    logger.info("donations.received", {
      amount: req.body.amount,
      email: req.body.email,
    });
    res.status(202).json({
      ok: true,
      message: "Donation intent recorded. A Stripe webhook would confirm.",
    });
  },
);
