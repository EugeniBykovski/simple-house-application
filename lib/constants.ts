import { Home, LetterText } from "lucide-react";

export const ACTIVITY_PER_PAGE = 8;
export const MESSAGES_LIMIT = 30;

export const topSidebarLinks = [
  {
    href: "/dashboard",
    Icon: Home,
    hoverTextKey: "HOME_HOVER",
  },
  {
    href: "/dashboard/chats",
    Icon: LetterText,
    hoverTextKey: "CHATS",
  },
];
