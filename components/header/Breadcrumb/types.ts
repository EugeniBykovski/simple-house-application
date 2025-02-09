export const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "chats",
  "assistant",
  "additional",
  "security",
  "theme",
  "billing",
  "adverts",
  "paymentDetails",
  "apartments",
];

export interface BreadcrumbProps {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  workspaceHref?: string;
}
