import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { AddressFormValues, addressSchema } from "@/schema/addressSchema";
import { ActionType } from "@/types/onBoardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

export const SecondStep = () => {
  const t = useTranslations("onboarding_form");

  const { currentStep, dispatch } = useOnboardingForm();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormValues) => {
    try {
      const response = await axios.post("/api/address", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Address successfully saved:", response.data);
        dispatch({
          type: ActionType.ADDRESS,
          payload: {
            street: data.street,
            houseNumber: data.houseNumber,
            entranceNumber: data.entranceNumber,
            floor: data.floor,
            apartmentNumber: data.apartmentNumber,
            contractCode: data.contractCode,
          },
        });

        if (response.data.workspaceId) {
          dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 2 });
        } else {
          dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
        }
      } else {
        console.error("Failed to submit address:", response.data);
      }
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 mt-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entranceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entrance Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartmentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartment Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contractCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!form.formState.isValid}
          >
            {t("NEXT_BTN")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
