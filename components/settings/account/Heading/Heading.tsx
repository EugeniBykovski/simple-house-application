"use client";

import { FC } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const Heading: FC = () => {
  const t = useTranslations("settings");

  return (
    <Card className="bg-background shadow-none mb-6">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("ACCOUNT.TITLE")}
        </h1>
        <CardDescription className="text-base">
          {t("ACCOUNT.DESC")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
