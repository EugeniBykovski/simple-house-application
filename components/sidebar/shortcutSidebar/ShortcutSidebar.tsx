import { Workspace } from "@prisma/client";
import { Bottom } from "./Bottom";
import { Top } from "./Top";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  userWorkspaces: Workspace[];
}

export const ShortcutSidebar = ({ userWorkspaces }: Props) => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <ScrollArea className="max-h-[35rem]">
        <div className="w-full space-y-3 p-1">
          <Top />
          <div>Workspaces</div>
          <div>AddWorkspace</div>
        </div>
      </ScrollArea>
      <Bottom />
    </div>
  );
};
