import { z } from "zod";

export const advertsUserSchema = z.object({
  username: z.string(),
  message: z
    .string()
    .nonempty("Message cannot be empty")
    .max(500, "Message cannot exceed 500 characters"),
  phone: z.string().optional(),
});

export type AdvertsUserSchema = z.infer<typeof advertsUserSchema>;
