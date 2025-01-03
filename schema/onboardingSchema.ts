import { z } from "zod";
import { addressSchema } from "@/schema/addressSchema";

export const onboardingSchema = z.object({
  name: z.string().optional().nullable(),
  surname: z.string().optional().nullable(),
  address: addressSchema,
  workspaceName: z
    .string()
    .min(4, { message: "Workspace name must be at least 4 characters long" })
    .refine((name) => /^[a-zA-Z0-9]+$/.test(name), {
      message: "Workspace name must contain only letters and numbers",
    }),
  workspaceImage: z.string().optional().nullable(),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
