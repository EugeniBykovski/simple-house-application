"use client";

import { WelcomingProps } from "./types";
import { forwardRef } from "react";
import { cn, getFormattedDate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Welcoming = forwardRef<HTMLDivElement, WelcomingProps>(
  (
    {
      className,
      hideOnMobile,
      hideOnDesktop,
      showOnlyOnPath,
      username,
      surname,
      name,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("common");

    const pathname = usePathname();
    const day = getFormattedDate();

    if (showOnlyOnPath && pathname !== showOnlyOnPath) return null;
    else {
      return (
        <div
          ref={ref}
          className={cn(`space-y-1 text-left`, className)}
          {...props}
        >
          <p className="font-bold text-zinc-400 sm:text-2xl text-xl">
            {t("WELCOMEBACK")},{" "}
            <span className="text-zinc-600">
              {name
                ? name && surname
                  ? `${name} ${surname}`
                  : name
                : username}
            </span>
          </p>
          <p className="text-muted-foreground text-sm max-w-sm sm:max-w-xl">
            {day[0].toUpperCase() + day.slice(1)}
          </p>
        </div>
      );
    }
  }
);

Welcoming.displayName = "Welcoming";

export default Welcoming;
