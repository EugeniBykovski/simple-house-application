import { Grid2x2Plus, Home, LetterText, Package } from "lucide-react";

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
  {
    href: "/dashboard/assistant",
    Icon: Package,
    hoverTextKey: "ASSISTANT",
  },
  {
    href: "/dashboard/additional",
    Icon: Grid2x2Plus,
    hoverTextKey: "ADDITIONAL",
  },
];
