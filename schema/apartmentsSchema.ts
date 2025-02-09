import { z } from "zod";

export const apartmentSchema = z.object({
  street: z.string().min(1, "Street is required"),
  houseNumber: z.string().min(1, "House number is required"),
  entranceNumber: z.string().min(1, "Entrance number or letter is required"),
  floor: z.string().min(1, "Floor number is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
});

export type ApartmentSchema = z.infer<typeof apartmentSchema>;
