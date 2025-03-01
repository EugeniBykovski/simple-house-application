"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const useChangeLocale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: "ru" | "en") => {
    setIsLoading(true);

    startTransition(() => {
      const updatedPath = `/${nextLocale}${pathname.replace(/^\/(en|ru)/, "")}`;
      router.replace(updatedPath);

      setIsLoading(false);
    });
  };

  return { isLoading, isPending, onSelectChange };
};
