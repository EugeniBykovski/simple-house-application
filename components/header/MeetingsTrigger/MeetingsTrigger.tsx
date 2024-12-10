"use client";

import { CalendarDays } from "lucide-react";
import { useMeetingsContext } from "@/context/MeetingsContext";

export const MeetingsTrigger = () => {
  const { openSheet } = useMeetingsContext();

  return (
    <CalendarDays
      onClick={openSheet}
      className="text-orange-500 cursor-pointer hover:text-orange-400 transition-all mr-2"
    />
  );
};
