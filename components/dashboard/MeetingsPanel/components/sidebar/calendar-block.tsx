"use client";

import { FC, Fragment } from "react";
import dayjs from "dayjs";
import { useDateStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const CalendarBlock: FC = () => {
  const {
    setMonth,
    selectedMonthIndex,
    twoDMonthArray,
    setDate,
    userSelectedDate,
  } = useDateStore();

  const weeksOfMonth = Array.from({ length: 5 }, (_, i) => i + 1);
  const handleDayClick = (day: dayjs.Dayjs) => setDate(day);

  return (
    <div className="my-2 p-2 w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "MMMM YYYY"
          )}
        </h4>
        <div className="flex items-center gap-3">
          <ArrowLeftFromLine
            className="w-4 h-4 text-zinc-500 cursor-pointer"
            onClick={() => setMonth(selectedMonthIndex - 1)}
          />
          <ArrowRightFromLine
            className="w-4 h-4 text-zinc-500 cursor-pointer"
            onClick={() => setMonth(selectedMonthIndex + 1)}
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-[auto_1fr]">
        <div className="w-6"></div>
        <div className="grid grid-cols-7 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <span key={i} className="py-1 text-center">
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-[auto_1fr] text-xs">
        <div className="grid w-6 grid-rows-5 gap-1 rounded-sm bg-gray-100 p-1">
          {weeksOfMonth.map((week) => (
            <span
              key={week}
              className="flex h-5 w-5 items-center justify-center"
            >
              {week}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 gap-1 p-1">
          {twoDMonthArray.map((row, i) => (
            <Fragment key={i}>
              {row.map((day, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full transition-all",
                    day.isSame(userSelectedDate, "day") &&
                      "bg-green-400 text-white",
                    day.isSame(dayjs(), "day") && "border border-green-400"
                  )}
                  onClick={() => handleDayClick(day)}
                >
                  <span>{day.format("D")}</span>
                </button>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
