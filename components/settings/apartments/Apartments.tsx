"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApartment } from "@/context/ApartmentContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApartmentSchema, apartmentSchema } from "@/schema/apartmentsSchema";

const Apartments = () => {
  const apartmentContext = useApartment();
  const { toast } = useToast();

  if (!apartmentContext) {
    return <div>Loading...</div>;
  }

  const { apartments, addApartment } = apartmentContext;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const response = await axios.get("/api/get-user-apartments");
      return response.data.apartments;
    },
    initialData: apartments,
  });

  const form = useForm<ApartmentSchema>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      street: "",
      houseNumber: "",
      entranceNumber: "",
      floor: "",
      apartmentNumber: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ApartmentSchema) => {
      const response = await axios.post("/api/add-apartments", data);
      return response.data;
    },
    onError: () => {
      toast({
        title: "Failed to add apartment",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: async (newApartment) => {
      toast({
        title: "Apartment added successfully",
        description: "Your apartment has been added.",
      });

      addApartment(newApartment.apartment);
      form.reset();
      await refetch();
    },
  });

  const onSubmit = (data: ApartmentSchema) => {
    mutate(data);
  };

  return (
    <main className="py-4 px-6">
      <h2 className="text-xl font-semibold mb-4">Your Extra Apartments:</h2>

      <div className="list-disc pl-5">
        {isFetching ? (
          <p className="text-gray-500">Loading apartments...</p>
        ) : data.length === 0 ? (
          <div>No apartments added yet</div>
        ) : (
          data.map((apartment: any) => (
            <div key={apartment.id} className="flex justify-center gap-2">
              <p>
                Street: {apartment.entrance?.house?.street ?? "Unknown Street"}
              </p>
              <p>
                House:{" "}
                {apartment.entrance?.house?.houseNumber ?? "Unknown Number"},
              </p>
              <p>
                Entrance:{" "}
                {apartment.entrance?.entranceNumber ?? "Unknown Entrance"},
              </p>
              <p>Floor: {apartment.floor ?? "Unknown Floor"},</p>
              <p>
                Apartment: {apartment.apartmentNumber ?? "Unknown Apartment"}
              </p>
            </div>
          ))
        )}
      </div>

      <h3 className="mt-6 text-lg font-semibold">Add New Apartment</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 mt-2"
        >
          <Input {...form.register("street")} placeholder="Street" required />
          <Input
            {...form.register("houseNumber")}
            placeholder="House Number"
            required
          />
          <Input
            {...form.register("entranceNumber")}
            placeholder="Entrance Number"
            required
          />
          <Input
            {...form.register("floor")}
            placeholder="Floor Number"
            required
          />
          <Input
            {...form.register("apartmentNumber")}
            placeholder="Apartment Number"
            required
          />

          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Adding..." : "Add Apartment"}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Apartments;
