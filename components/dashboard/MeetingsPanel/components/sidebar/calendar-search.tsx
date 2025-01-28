import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CalendarSearch: FC = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">Find people:</Label>
      <Input id="search" type="search" placeholder="Search..." />
    </div>
  );
};

export default CalendarSearch;
