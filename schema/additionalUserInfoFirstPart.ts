import { z } from "zod";

export const additionalUserInfoFirstPart = z.object({
  name: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Username must only contain letters and digits",
    })
    .optional(),
  surname: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Surname must only contain letters and digits",
    })
    .optional(),
});

export type AdditionalUserInfoFirstPart = z.infer<
  typeof additionalUserInfoFirstPart
>;
