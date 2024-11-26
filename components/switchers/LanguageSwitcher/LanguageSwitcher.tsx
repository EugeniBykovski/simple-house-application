"use client";

import { FC } from "react";

import { supportedLocales } from "@/data/mock-data";
import { AvailableLocales } from "@/app/i18n/translations";
import { useLanguage } from "@/context/LanguageProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher: FC = () => {
  const { locale, changeLanguage } = useLanguage();

  return (
    <Select
      value={locale}
      onValueChange={(value: any) => changeLanguage(value as AvailableLocales)}
    >
      <SelectTrigger className="p-2 focus:ring-0 bg-[#f06060] text-white rounded">
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent className="bg-[#f06060] text-white rounded shadow-md">
        {supportedLocales.map((lang) => (
          <SelectItem
            key={lang}
            value={lang}
            className="cursor-pointer hover:opacity-80"
          >
            {lang.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";

export default LanguageSwitcher;
