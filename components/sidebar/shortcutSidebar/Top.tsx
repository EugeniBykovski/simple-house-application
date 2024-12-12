"use client";

import { topSidebarLinks } from "@/lib/constants";
import { SidebarLink } from "./SidebarLink";

interface TopProps {
  isCollapsed: boolean;
}

export const Top = ({ isCollapsed }: TopProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {topSidebarLinks.map((link, i) => (
        <SidebarLink
          key={`link_${i}`}
          Icon={link.Icon}
          hoverTextKey={link.hoverTextKey}
          href={link.href}
          // include={link?.include}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};
