import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z.string().min(1).default("dev-only-secret-change-me"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004",
    ),
});

const parsed = envSchema.parse(process.env);

export const env = {
  ...parsed,
  corsOrigins: parsed.CORS_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean),
};

export type Env = typeof env;
