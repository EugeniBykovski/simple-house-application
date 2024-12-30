export const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "security",
  "theme",
  "billing",
  "adverts",
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
