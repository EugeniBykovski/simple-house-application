export const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "chats",
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
