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
import {
  CodeField,
  MessageField,
  PhoneField,
  UsernameField,
} from "./AdvertsFormFields";
import AdvertsInfo from "./AdvertsInfo";
import AdvertsPrice from "./AdvertsPrice";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export const Adverts = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

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
      voucherCode: "",
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
      router.refresh();
    },
  });

  const onSubmit = (data: AdvertsUserSchema) => {
    if (!voucherCode) {
      toast({ title: "Code is required", variant: "destructive" });
      return;
    }

    mutate({
      username: username || data.username,
      message: data.message,
      phone: data.phone || "",
      voucherCode: voucherCode,
    });
  };

  const onCancel = () => form.reset();

  return (
    <main className="py-2 px-3 flex sm:flex-col md:flex-row justify-evenly gap-14 items-start">
      <div className="mb-4">
        <h3 className="font-bold text-xl text-zinc-600 flex justify-center items-center gap-2">
          <Info className="w-5 h-5 text-green-400" /> Here you can add your
          advert:
        </h3>
        <p className="text-xs text-zinc-400">
          (it will be available after moderation)
        </p>
        <AdvertsInfo />
        <AdvertsPrice
          setVoucherCode={setVoucherCode}
          voucherCode={voucherCode}
        />
      </div>
      <div className="flex flex-col justify-start text-left">
        <div className="mb-4">
          <h3 className="font-bold text-xl text-zinc-600">
            Enter the required data in the fields:
          </h3>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-96"
            >
              <UsernameField control={form.control} username={username} />
              <MessageField control={form.control} />
              <PhoneField control={form.control} />
              <CodeField control={form.control} />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!voucherCode || isPending}
                  className="bg-green-400"
                >
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
