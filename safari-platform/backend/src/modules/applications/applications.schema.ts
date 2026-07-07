import { z } from "zod";

export const ventureCategoryEnum = z.enum([
  "agriculture",
  "food_beverage",
  "fashion_textiles",
  "handcraft_decor",
  "cosmetics",
  "clean_energy",
  "technology",
  "services",
  "other",
]);

export const ventureStageEnum = z.enum([
  "idea",
  "pilot",
  "operating",
  "growing",
  "scaling",
]);

export const monthlyRevenueEnum = z.enum([
  "under_500k",
  "500k_2m",
  "2m_10m",
  "10m_50m",
  "over_50m",
]);

export const createApplicationSchema = z.object({
  ventureName: z.string().min(2),
  ventureSummary: z.string().min(10),
  category: ventureCategoryEnum.optional(),
  stage: ventureStageEnum.optional(),
  location: z.string().min(1).optional(),
  yearsOperating: z.number().int().nonnegative().optional(),
  monthlyRevenue: monthlyRevenueEnum.optional(),
  teamSize: z.number().int().nonnegative().optional(),
  programInterest: z.string().min(1).optional(),
  motivation: z.string().min(1).optional(),
  contactPhone: z.string().min(1).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["draft", "submitted", "in_review", "accepted", "rejected"]),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
