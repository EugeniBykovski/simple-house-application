"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton: FC = () => {
  const t = useTranslations("common");
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.back();
        router.refresh();
      }}
      className="gap-1 flex justify-center items-center"
      variant={"secondary"}
      size={"sm"}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:inline-block">{t("BACK_BTN")}</span>
    </Button>
  );
};
