"use client";

import { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpToLine } from "lucide-react";

const MeetingsPanel: FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-0 h-screen">
        <div className="flex justify-center items-center pl-2 hover:bg-zinc-50 rounded-l-lg h-[8rem] transition">
          <ArrowUpToLine className="text-zinc-300 mr-1 -rotate-90" />
          <span className="h-24 w-1.5 bg-zinc-300 rounded-full"></span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[75vw] h-full flex justify-center items-start sm:max-w-[75vw]"
      >
        Meetings Block
      </SheetContent>
    </Sheet>
  );
};

export default MeetingsPanel;
