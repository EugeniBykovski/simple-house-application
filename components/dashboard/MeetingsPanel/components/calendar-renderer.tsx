"use client";

import { useEventStore } from "@/store/store";
import { CalendarEventType } from "@/store/types";
import dayjs from "dayjs";

type EventRendererProps = {
  date: dayjs.Dayjs;
  view: "month" | "week" | "day";
  events: CalendarEventType[];
};

export const EventRenderer = ({ date, view, events }: EventRendererProps) => {
  const { openEventSummary } = useEventStore();

  const filteredEvents = events.filter((event: CalendarEventType) => {
    if (view === "month") {
      return event.date.format("DD-MM-YY") === date.format("DD-MM-YY");
    } else if (view === "week" || view === "day") {
      return event.date.format("DD-MM-YY HH") === date.format("DD-MM-YY HH");
    }
  });

  if (view === "month" && filteredEvents.length > 3) {
    return (
      <div className="w-full flex flex-col gap-1">
        {filteredEvents.slice(0, 3).map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            className="line-clamp-1 w-full cursor-pointer rounded-sm bg-green-700 p-1 text-sm text-white"
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex gap-1">
      {filteredEvents.map((event, index) => (
        <div
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
            openEventSummary(event);
          }}
          className="line-clamp-1 flex-1 cursor-pointer rounded-sm bg-green-700 p-1 text-sm text-white"
          style={{ width: `${100 / filteredEvents.length}%` }}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};
