"use client";

import { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpToLine } from "lucide-react";
import { useMeetingsContext } from "@/context/MeetingsContext";
import { Button } from "@/components/ui/button";

const MeetingsPanel: FC = () => {
  const { isOpen, openSheet, closeSheet } = useMeetingsContext();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openSheet() : closeSheet())}
    >
      <SheetTrigger asChild>
        <Button variant={"link"} className="fixed right-0 p-0 h-screen">
          <div className="flex justify-center items-center pl-2 hover:bg-zinc-50 rounded-l-lg h-[8rem] transition">
            <ArrowUpToLine className="text-zinc-300 mr-1 -rotate-90" />
            <span className="h-24 w-1.5 bg-zinc-300 rounded-full"></span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[75vw] h-full flex justify-center items-start sm:max-w-[75vw]"
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold">Meetings Block</h2>
          <p className="text-gray-600">Your meetings and events go here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MeetingsPanel;
