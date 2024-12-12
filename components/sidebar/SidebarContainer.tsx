"use client";

import { useToggleSidebar } from "@/context/ToggleSidebar";
import { Workspace } from "@prisma/client";
import { CloseSidebar } from "./CloseSidebar";
import { ShortcutSidebar } from "./shortcutSidebar/ShortcutSidebar";
import OptionsSidebar from "./optionsSidebar/OptionsSidebar";

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
        className={`z-50 top-0 h-full left-0 bg-background border-r lg:translate-x-0 transition-all duration-300 sm:hidden lg:flex shadow-lg ${
          isOpen ? "translate-x-0 shadow-sm" : "translate-x-[-100%]"
        }`}
      >
        <ShortcutSidebar
          userWorkspaces={userWorkspaces ? userWorkspaces : []}
        />
        <OptionsSidebar
        // createdWorkspaces={}
        // userAdminWorkspaces={userAdminWorkspaces}
        // userWorkspaces={userWorkspaces}
        />
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
