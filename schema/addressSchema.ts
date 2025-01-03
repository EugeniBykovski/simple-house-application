import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  houseNumber: z.string().min(1, "House number is required"),
  entranceNumber: z.string().min(1, "Entrance number is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
  contractCode: z.string().min(1, "Contract code is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
