"use client";

import { LocaleSwitcher } from "@/components/switchers/LocaleSwitcher/LocaleSwitcher";
import ActiveLink from "@/components/ui/active-link";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowRightLeft, LogOutIcon, Settings2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

export const Bottom = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const t = useTranslations("sidebar");

  const lang = useLocale();
  const logOutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/${lang}`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger>
          <LocaleSwitcher
            textSize="text-lg"
            alignHover="start"
            alignDropdown="start"
            variant={"ghost"}
            size={"icon"}
          />
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t("MAIN.CHANGE_LANG_HOVER")}</span>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <Button onClick={toggleSidebar} variant={"ghost"} size={"icon"}>
            <ArrowRightLeft />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t("MAIN.OPEN_CLOSE_SIDEBAR_HOVER")}</span>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <Button onClick={logOutHandler} variant={"ghost"} size={"icon"}>
            <LogOutIcon />
          </Button>
        </HoverCardTrigger>
      </HoverCard>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={2}>
          <ActiveLink
            include="settings"
            variant={"ghost"}
            size={"icon"}
            href="/dashboard/settings"
          >
            <Settings2 />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t("MAIN.SETTINGS_HOVER")}</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
