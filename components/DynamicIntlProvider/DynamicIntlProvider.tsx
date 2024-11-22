"use client";

import { FC } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useLanguage } from "@/context/LanguageProvider";

export const DynamicIntlProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { locale, messages } = useLanguage();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};
