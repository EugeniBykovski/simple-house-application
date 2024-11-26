"use client";

// @ts-ignore
import { usePathname, useRouter } from "next-intl/client";
import { useState, useTransition } from "react";

export const useChangeLocale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: "ru" | "en") => {
    setIsLoading(true);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return { isLoading, isPending, onSelectChange };
};
