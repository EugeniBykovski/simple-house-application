"use client";

import { cn } from "@/lib/utils";
import { useDateStore, useEventStore } from "@/store/store";
import dayjs from "dayjs";
import { EventRenderer } from "../calendar-renderer";

const CalendarMonthLayout = ({
  day,
  rowIndex,
}: {
  day: dayjs.Dayjs | null;
  rowIndex: number;
}) => {
  const { openPopover, events } = useEventStore();
  const { setDate } = useDateStore();

  if (!day) {
    return (
      <div className="h-12 w-full border md:h-28 md:w-full lg:h-full"></div>
    );
  }

  const isFirstDayOfMonth = day.date() === 1;
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDate(day);
    openPopover();
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center p-2 gap-y-2 border",
        "transition-all hover:shadow-xl"
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {rowIndex === 0 && (
          <h4 className="text-xs text-gray-500">
            {day.format("ddd").toUpperCase()}
          </h4>
        )}
        <h4
          className={cn(
            "text-center text-sm",
            isToday &&
              "flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-white"
          )}
        >
          {isFirstDayOfMonth ? day.format("MMM D") : day.format("D")}
        </h4>
      </div>
      <EventRenderer date={day} view="month" events={events} />
    </div>
  );
};

export default CalendarMonthLayout;
