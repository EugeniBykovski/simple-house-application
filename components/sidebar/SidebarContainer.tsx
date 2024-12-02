"use client";

import { useToggleSidebar } from "@/context/ToggleSidebar";
import { Workspace } from "@prisma/client";
import { CloseSidebar } from "./CloseSidebar";
import { ShortcutSidebar } from "./shortcutSidebar/ShortcutSidebar";

interface Props {
  userWorkspaces: Workspace[];
  userId: string;
  userAdminWorkspaces: Workspace[];
}

export const SidebarContainer = ({
  userWorkspaces,
  userId,
  userAdminWorkspaces,
}: Props) => {
  const { isOpen, setIsOpen } = useToggleSidebar();

  return (
    <>
      <aside
        className={`fixed z-50 top-0 h-full left-0 bg-background border-r flex lg:translate-x-0 transition-all duration-300 ${
          isOpen ? "translate-x-0 shadow-sm" : "translate-x-[-100%]"
        }`}
      >
        <ShortcutSidebar
          userWorkspaces={userWorkspaces ? userWorkspaces : []}
        />
        <div>OptionsSidebar</div>
        <CloseSidebar />
      </aside>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={`fixed h-screen w-full top-0 left-0 bg-black/80 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};
