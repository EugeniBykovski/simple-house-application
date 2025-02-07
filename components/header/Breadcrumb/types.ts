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
