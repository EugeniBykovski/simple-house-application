import { FC } from "react";
import CalendarSearch from "./calendar-search";
import CalendarBlock from "./calendar-block";
import CalendarCreate from "./calendar-create";

interface User {
  id: string;
  username: string;
  email: string | null;
  image: string | null;
}

interface CalendarSidebarProps {
  users: User[];
}

const CalendarSidebar: FC<CalendarSidebarProps> = ({ users }) => {
  return (
    <div className="px-4 h-full w-[24%] bg-zinc-50 hover:shadow-md transition cursor-pointer p-2 rounded-md flex justify-start items-center gap-4 flex-col">
      <CalendarCreate />
      <CalendarBlock />
      <CalendarSearch users={users} />
    </div>
  );
};

export default CalendarSidebar;
