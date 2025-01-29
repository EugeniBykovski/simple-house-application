"use client";

import { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpToLine } from "lucide-react";
import Chats from "@/components/chats/chats";

export const DraggablePanel: FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center z-10">
        <div className="flex justify-center items-center flex-col pt-2 hover:bg-zinc-50 rounded-t-lg w-[8rem] transition backdrop-blur-sm">
          <ArrowUpToLine className="text-zinc-300 mb-1" />
          <span className="h-1.5 w-24 bg-zinc-300 rounded-full"></span>
        </div>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-[75%] flex justify-center">
        <Chats />
      </SheetContent>
    </Sheet>
  );
};
