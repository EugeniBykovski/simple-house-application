import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { User } from "./User";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";

interface Props {
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

export const DashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
  showBackBtn,
}: Props) => {
  const session = await getAuthSession();
  if (!session) return null;
  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mb-4 p-4 gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div>OpenSidebar</div>
        <div>Welcoming</div>
        {showBackBtn && <BackButton />}
        <div>SavingStatus</div>
        {!hideBreadCrumb && (
          <Breadcrumb
            addManualRoutes={addManualRoutes}
            workspaceHref={workspaceHref}
          />
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
          {children}
          <div>NotificationContainer</div>
        </div>
        <User
          profileImage={session?.user.image}
          username={session.user.username!}
          email={session.user.email!}
        />
      </div>
    </header>
  );
};
