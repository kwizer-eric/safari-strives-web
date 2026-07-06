import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "@/common/errors";
import { logger } from "@/common/logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "ValidationError",
      message: "Invalid request payload",
      details: err.flatten(),
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.name,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  logger.error("http.unhandled", {
    message: (err as Error).message,
    stack: (err as Error).stack,
  });
  res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
  });
};
