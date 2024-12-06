export interface DashboardHeaderProps {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  workspaceHref?: string;
  hideBreadCrumb?: boolean;
  showingSavingStatus?: boolean;
  showBackBtn?: boolean;
}
