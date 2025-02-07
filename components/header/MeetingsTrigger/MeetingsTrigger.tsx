"use client";

import { CalendarDays } from "lucide-react";
import { useMeetingsContext } from "@/context/MeetingsContext";

export const MeetingsTrigger = () => {
  const { openSheet } = useMeetingsContext();

  return (
    <div className="flex items-center gap-1 sm:gap-2 text-zinc-500 cursor-pointer hover:text-zinc-400 transition-all mr-2">
      <CalendarDays onClick={openSheet} className="w-5 h-5" />
      <p className="text-sm">Calendar</p>
    </div>
  );
};
