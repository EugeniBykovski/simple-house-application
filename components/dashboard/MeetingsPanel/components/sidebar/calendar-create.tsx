"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCallback } from "react";
import { useDateStore } from "@/store/store";
import { CalendarPopover } from "../calendar-popover";

const CalendarCreate = () => {
  const { userSelectedDate } = useDateStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpenPopover = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  }, []);

  const handleClosePopover = useCallback(() => setIsPopoverOpen(false), []);

  return (
    <>
      <Button
        variant="ghost"
        className="justify-between rounded-full py-4 w-full shadow"
        onClick={handleOpenPopover}
      >
        <div className="flex items-center gap-2">
          <PlusCircle className="mr-2 h-6 w-6" /> <span>Create</span>
        </div>
      </Button>
      {isPopoverOpen && (
        <CalendarPopover
          isOpen={isPopoverOpen}
          onClose={handleClosePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}
    </>
  );
};

export default CalendarCreate;
