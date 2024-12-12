"use client";

import ActiveLink from "@/components/ui/active-link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  href: string;
  Icon: LucideIcon;
  hoverTextKey: string;
  include?: string;
  isCollapsed: boolean;
}

export const SidebarLink = ({
  hoverTextKey,
  href,
  Icon,
  include,
  isCollapsed,
}: Props) => {
  const t = useTranslations("sidebar.MAIN");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ActiveLink
            include={include}
            variant={"ghost"}
            size={"icon"}
            href={href}
            className={clsx(
              "flex items-center gap-2 transition-colors duration-200 rounded-md p-2",
              isCollapsed ? "w-[max-content]" : "w-full justify-start",
              "hover:bg-gray-200 active:bg-gray-300"
            )}
          >
            <Icon />
            {!isCollapsed && (
              <span className="text-sm text-zinc-600">{t(hoverTextKey)}</span>
            )}
          </ActiveLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>{t(hoverTextKey)}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
