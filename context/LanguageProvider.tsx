"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import translations, { AvailableLocales } from "@/app/i18n/translations";

type LanguageContextType = {
  locale: AvailableLocales;
  messages: Record<string, string>;
  changeLanguage: (lang: AvailableLocales) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locale, setLocale] = useState<AvailableLocales>("en");
  const [messages, setMessages] = useState(translations[locale] || {});

  useEffect(() => {
    const storedLocale =
      (localStorage.getItem("locale") as AvailableLocales) ||
      (searchParams.get("lang") as AvailableLocales) ||
      "en";
    setLocale(storedLocale);
    setMessages(translations[storedLocale] || translations["en"]);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("locale", locale);
    setMessages(translations[locale] || translations["en"]);
  }, [locale]);

  const changeLanguage = (lang: AvailableLocales) => {
    setLocale(lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    // @ts-ignore
    <LanguageContext.Provider value={{ locale, messages, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
