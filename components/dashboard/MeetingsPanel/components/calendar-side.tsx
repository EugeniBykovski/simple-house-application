"use client";

import { FC, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/user-avatar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectOptions } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import CalendarMonth from "./periods/calendar-month";
import { useDateStore, useEventStore, useViewStore } from "@/store/store";
import CalendarDay from "./periods/calendar-day";
import dayjs from "dayjs";
import CalendarWeek from "./periods/calendar-week";
import { CalendarPopover } from "./calendar-popover";
import { CalendarEventType } from "@/store/types";
import {
  getAllUsersWorkspaceEvents,
  getEvents,
} from "@/app/actions/event-actions";
import { CalendarSummaryPopover } from "./calendar-summary";
import CalendarSidebar from "./sidebar/calendar-sidebar";

const CalendarSide: FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [users, setUsers] = useState<
    {
      id: string;
      username: string;
      email: string | null;
      image: string | null;
    }[]
  >([]);

  const todaysDate = dayjs();
  const { userSelectedDate, setDate, setMonth, selectedMonthIndex } =
    useDateStore();
  const { selectedView, setView } = useViewStore();

  const {
    isPopoverOpen,
    closePopover,
    setEvents,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
  } = useEventStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        const mappedEvents: CalendarEventType[] = eventsData.map((event) => ({
          id: event.id,
          date: dayjs(event.date),
          title: event.title,
          description: event.description,
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [setEvents]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsersWorkspaceEvents();
        setUsers(users);
        console.log("Users in the same workspace:", users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) throw new Error("Failed to fetch session");

        const data = await response.json();
        setProfileImage(data.user?.image ?? null);
        setUserName(data.user?.username ?? null);
      } catch (error) {
        console.error("Session error:", error);
      }
    };

    fetchSession();
  }, []);

  const handleTodayClick = () => {
    setDate(todaysDate);
    setMonth(todaysDate.month());
  };

  const handlePrevClick = () => {
    if (selectedView === "month") setMonth(selectedMonthIndex - 1);
    if (selectedView === "week") setDate(userSelectedDate.subtract(1, "week"));
    if (selectedView === "day") setDate(userSelectedDate.subtract(1, "day"));
  };

  const handleNextClick = () => {
    if (selectedView === "month") setMonth(selectedMonthIndex + 1);
    if (selectedView === "week") setDate(userSelectedDate.add(1, "week"));
    if (selectedView === "day") setDate(userSelectedDate.add(1, "day"));
  };

  return (
    <div className="flex flex-col items-start cursor-pointer w-full p-2 rounded-md h-full">
      <div className="flex justify-between items-center w-full bg-zinc-100 py-2 px-4 rounded-md text-sm mb-4">
        <div className="flex justify-between items-center gap-2">
          <Button
            onClick={handleTodayClick}
            variant={"outline"}
            className="text-xs"
            size={"sm"}
          >
            Today
          </Button>

          <div className="flex items-center gap-2">
            <ChevronLeft
              onClick={handlePrevClick}
              className="w-4 h-4 cursor-pointer text-zinc-500 hover:bg-zinc-100 transition rounded-sm"
            />
            <ChevronRight
              onClick={handleNextClick}
              className="w-4 h-4 cursor-pointer text-zinc-500 hover:bg-zinc-100 transition rounded-sm"
            />
          </div>

          <h3 className="text-sm text-green-500">
            {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
              "MMMM YYYY"
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Select onValueChange={(view) => setView(view)}>
            <SelectTrigger className="w-24 focus-visible:outline-none">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions?.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-4 bg-zinc-400" />
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile image"
              className="w-8 h-8 rounded-full object-cover"
              width={30}
              height={30}
            />
          ) : (
            <UserAvatar className="w-8 h-8" />
          )}
          <p className="text-zinc-600 text-xs">{userName}</p>
        </div>
      </div>

      <div className="flex justify-between items-start gap-2 h-full w-full">
        <CalendarSidebar users={users} />
        <div className="flex justify-center items-start px-4 w-[100%] h-full rounded-md flex-col">
          {selectedView === "month" && <CalendarMonth />}
          {selectedView === "week" && <CalendarWeek />}
          {selectedView === "day" && <CalendarDay />}
        </div>
        {isPopoverOpen && (
          <CalendarPopover
            isOpen={isPopoverOpen}
            onClose={closePopover}
            date={userSelectedDate.format("YYYY-MM-DD")}
          />
        )}
        {isEventSummaryOpen && selectedEvent && (
          <CalendarSummaryPopover
            isOpen={isEventSummaryOpen}
            onClose={closeEventSummary}
            event={selectedEvent}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarSide;
