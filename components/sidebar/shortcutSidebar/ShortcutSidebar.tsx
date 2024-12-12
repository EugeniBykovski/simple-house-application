import { Workspace } from "@prisma/client";
import { Bottom } from "./Bottom";
import { Top } from "./Top";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface ShortcutSidebarProps {
  userWorkspaces: Workspace[];
}

export const ShortcutSidebar = ({ userWorkspaces }: ShortcutSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <div
      className={`border-r h-full flex flex-col justify-between items-start p-2 pl-3 sm:py-2 bg-background transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-32"
      }`}
    >
      <ScrollArea className="max-h-[35rem]">
        <div className="w-full space-y-2 p-1">
          <Top isCollapsed={isCollapsed} />
        </div>
      </ScrollArea>
      <Bottom toggleSidebar={toggleSidebar} />
    </div>
  );
};
