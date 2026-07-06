import { z } from "zod";

export const donationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  amount: z.number().int().positive(),
  message: z.string().max(500).optional(),
});

export type DonationInput = z.infer<typeof donationSchema>;
