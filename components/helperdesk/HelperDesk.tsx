"use client";

import { FC } from "react";
import { BadgeHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const HelperDesk: FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="fixed bottom-2 right-4 p-[4px] border rounded-lg border-dashed border-zinc-300 cursor-pointer hover:border-green-300 transition">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex justify-center items-center">
                <BadgeHelp className="w-7 h-7 text-green-400 hover:text-green-300 transition" />
              </TooltipTrigger>
              <TooltipContent>
                When you click on it, you will be taken to the platform's
                support and training service
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="md:h-[50vh] md:min-w-[70vw] md:inset-y-[50vh] rounded-tl-lg"
      >
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
