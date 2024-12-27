"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { useLocale, useTranslations } from "next-intl";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { useChangeLocale } from "@/hooks/useChangeLocale";
import { LocaleSwitcherProps } from "./types";
import { locales } from "./constants";

export const LocaleSwitcher = ({
  size = "default",
  variant = "default",
  alignHover = "center",
  alignDropdown = "center",
  textSize = "text-base",
}: LocaleSwitcherProps) => {
  const locale = useLocale();
  const t = useTranslations("common");

  const { isLoading, onSelectChange } = useChangeLocale();

  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isLoading}
            variant={variant}
            size={size}
            className={textSize}
          >
            {isLoading ? (
              <LoadingState className="mr-0" />
            ) : (
              <span className="text-sm">{locale.toUpperCase()}</span>
            )}
            <span className="sr-only">{t("LANG_HOVER")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={alignDropdown}>
          {locales.map(({ code, label }) => (
            <DropdownMenuItem
              key={code}
              onClick={() => {
                onSelectChange(code);
              }}
              className="cursor-pointer"
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent align={alignHover}>
        <span>{t("LANG_HOVER")}</span>
      </HoverCardContent>
    </HoverCard>
  );
};
