import express, { type Express } from "express";
import cors from "cors";
import { env } from "@/config/env";
import "@/common/types";
import { errorHandler } from "@/middleware/error-handler";
import { requestLog } from "@/middleware/request-log";
import { getDatabase } from "@/infrastructure/db";
import { seedDatabase } from "@/infrastructure/seed";
import { registerRoutes } from "@/routes";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(requestLog);

  const db = getDatabase();
  if (db.users.size === 0) {
    seedDatabase(db);
  }

  app.use("/", registerRoutes());
  app.use(errorHandler);

  return app;
}
