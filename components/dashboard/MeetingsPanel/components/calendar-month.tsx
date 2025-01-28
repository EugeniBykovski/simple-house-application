import { getMonth } from "@/lib/getTime";
import CalendarMonthLayout from "./calendar-month-layout";
import { Fragment } from "react";

const CalendarMonth = () => {
  const currentMonth = getMonth();

  return (
    <section className="grid grid-cols-7 grid-rows-5 h-[100%] w-full">
      {currentMonth.map((row, i) => (
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
