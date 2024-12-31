"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdvertsUserSchema,
  advertsUserSchema,
} from "@/schema/advertsUserSchema";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchSession } from "@/lib/fetchSession";
import { MessageField, PhoneField, UsernameField } from "./AdvertsFormFields";

export const Adverts = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetchSession()
      .then((username: string) => setUsername(username))
      .catch(() => setUsername("Guest"));
  }, []);

  const form = useForm<AdvertsUserSchema>({
    resolver: zodResolver(advertsUserSchema),
    defaultValues: {
      username: username,
      message: "",
      phone: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AdvertsUserSchema) => {
      const response = await axios.post("/api/adverts", data);
      return response.data;
    },
    onError: () => {
      toast({
        title: "Failed to submit your advert",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Advert submitted successfully",
        description: "It will be visible after moderation.",
      });
      form.reset();
    },
  });

  const onSubmit = (data: AdvertsUserSchema) => {
    mutate({
      username: username || data.username,
      message: data.message,
      phone: data.phone || "",
    });
  };

  const onCancel = () => {
    form.reset();
  };

  return (
    <main className="py-2 px-3">
      <div className="flex flex-col justify-start text-left">
        <div className="mb-4">
          <h3 className="font-bold text-xl text-zinc-600">
            Here you can add your advert:
          </h3>
          <p className="text-xs text-zinc-400">
            (it will be available after moderation)
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[30%]"
            >
              <UsernameField control={form.control} username={username} />
              <MessageField control={form.control} />
              <PhoneField control={form.control} />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="">
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};
