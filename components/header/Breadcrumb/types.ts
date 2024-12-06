export const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "security",
  "theme",
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
