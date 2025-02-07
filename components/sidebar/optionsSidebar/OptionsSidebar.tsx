"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "./settingsOptions/Settings";
import { Workspace } from "@prisma/client";
import { Advertisements } from "./advertisementSection/Advertisements";

interface Props {
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
  userWorkspaces: Workspace[];
}

export const OptionsSidebar = ({
  createdWorkspaces,
  userAdminWorkspaces,
  userWorkspaces,
}: Props) => {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-4 flex flex-col justify-between">
      <ScrollArea className="h-full">
        {pathname.includes("/dashboard/settings") && (
          <Settings userAdminWorkspaces={userAdminWorkspaces} />
        )}
      </ScrollArea>
      <Advertisements />
    </div>
  );
};
