"use client";

import React, { useRef, useEffect } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CalendarEventType } from "@/store/types";

interface CalendarSummaryPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEventType;
}

export const CalendarSummaryPopover = ({
  isOpen,
  onClose,
  event,
}: CalendarSummaryPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Event Summary</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Title:</strong> {event.title}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {dayjs(event.date).format("dddd, MMMM D, YYYY h:mm A")}
          </p>
        </div>
      </div>
    </div>
  );
};
