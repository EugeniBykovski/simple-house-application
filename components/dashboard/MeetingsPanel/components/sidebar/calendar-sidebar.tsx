import { FC } from "react";
import CalendarSearch from "./calendar-search";
import CalendarBlock from "./calendar-block";

const CalendarSidebar: FC = () => {
  return (
    <div className="px-4 h-full w-[24%] bg-zinc-50 hover:shadow-md transition cursor-pointer p-2 rounded-md flex justify-start items-center gap-4 flex-col">
      <CalendarBlock />
      <CalendarSearch />
    </div>
  );
};

export default CalendarSidebar;
