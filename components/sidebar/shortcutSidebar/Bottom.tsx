"use client";

import { Theme } from "@/components/settings/theme/Theme";
import { LocaleSwitcher } from "@/components/switchers/LocaleSwitcher/LocaleSwitcher";
import ActiveLink from "@/components/ui/active-link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRightLeft,
  GalleryVerticalEnd,
  LogOutIcon,
  Palette,
  PanelRightClose,
  Settings2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

export const Bottom = ({
  toggleSidebar,
  toggleOptionsSidebar,
}: {
  toggleSidebar: () => void;
  toggleOptionsSidebar: () => void;
}) => {
  const t = useTranslations("sidebar");

  const lang = useLocale();
  const logOutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/${lang}`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleOptionsSidebar}
              variant={"ghost"}
              size={"icon"}
            >
              <PanelRightClose />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.OPEN_CLOSE_SIDEBAR_BOTTOM_HOVER")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleSidebar} variant={"ghost"} size={"icon"}>
              <ArrowRightLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.OPEN_CLOSE_SIDEBAR_HOVER")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ActiveLink
              include="settings"
              variant={"ghost"}
              size={"icon"}
              href="/dashboard/settings"
            >
              <Settings2 />
            </ActiveLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.SETTINGS_HOVER")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <ActiveLink
                  include="theme"
                  variant="ghost"
                  size="icon"
                  href="#"
                >
                  <Palette />
                </ActiveLink>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-48 ml-4">
                <h3 className="mb-6 text-sm text-zinc-500 flex justify-center">
                  Choose your theme:
                </h3>
                <Theme size="small" />
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.CHANGE_THEMES")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <LocaleSwitcher
                textSize="text-lg"
                alignHover="start"
                alignDropdown="start"
                variant={"ghost"}
                size={"icon"}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.CHANGE_LANG_HOVER")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={logOutHandler} variant={"ghost"} size={"icon"}>
              <LogOutIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <span>{t("MAIN.LOG_OUT_HOVER")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
