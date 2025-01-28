"use client";

import CalendarMonthLayout from "./calendar-month-layout";
import { Fragment } from "react";
import { useDateStore } from "@/store/store";

const CalendarMonth = () => {
  const { twoDMonthArray } = useDateStore();

  return (
    <section className="grid grid-cols-7 grid-rows-5 h-[100%] w-full">
      {twoDMonthArray.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, index) => (
            <CalendarMonthLayout key={index} day={day} rowIndex={i} />
          ))}
        </Fragment>
      ))}
    </section>
  );
};

export default CalendarMonth;
