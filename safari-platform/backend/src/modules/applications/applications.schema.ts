import { z } from "zod";

export const createApplicationSchema = z.object({
  ventureName: z.string().min(2),
  ventureSummary: z.string().min(10),
});

export const updateStatusSchema = z.object({
  status: z.enum(["draft", "submitted", "in_review", "accepted", "rejected"]),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
