"use client";

import { FC, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpToLine } from "lucide-react";

export const DraggablePanel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger
        className="flex justify-center z-10"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-center items-center flex-col pt-2 hover:bg-zinc-50 rounded-t-lg w-[8rem] transition backdrop-blur-sm">
          <ArrowUpToLine className="text-zinc-300 mb-1" />
          <span className="h-1.5 w-24 bg-zinc-300 rounded-full"></span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[93%] flex justify-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        Some Content Else
      </SheetContent>
    </Sheet>
  );
};
