import dayjs, { Dayjs } from "dayjs";

export interface ViewStoreType {
  selectedView: string;
  setView: (value: string) => void;
}

export interface DateStoreType {
  userSelectedDate: Dayjs;
  setDate: (value: Dayjs) => void;
  twoDMonthArray: dayjs.Dayjs[][];
  selectedMonthIndex: number;
  setMonth: (index: number) => void;
}

export type CalendarEventType = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  description: string;
};

export type UserType = {
  id: string;
  username: string;
  email: string | null;
  image?: string | null;
};

export type EventStore = {
  events: CalendarEventType[];
  isPopoverOpen: boolean;
  isEventSummaryOpen: boolean;
  selectedEvent: CalendarEventType | null;
  setEvents: (events: CalendarEventType[]) => void;
  openPopover: () => void;
  closePopover: () => void;
  openEventSummary: (event: CalendarEventType) => void;
  closeEventSummary: () => void;
  addUserToCall: (user: UserType) => void;
};

export interface ToggleSideBarType {
  isSideBarOpen: boolean;
  setSideBarOpen: () => void;
}
