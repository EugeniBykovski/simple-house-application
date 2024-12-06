import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { User } from "../User";
import { BackButton } from "../BackButton";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import Welcoming from "../../common/Welcoming/Welcoming";
import { SavingStatus } from "../SavingStatus";
import { OpenSidebar } from "../OpenSidebar";
import { DashboardHeaderProps } from "./types";
import { SignDocuments } from "../SignDocuments/SignDocuments";

export const DashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
  showBackBtn,
}: DashboardHeaderProps) => {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mb-4 p-4 gap-2 shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <OpenSidebar />
        <Welcoming
          hideOnMobile
          hideOnDesktop
          username={session?.user.username!}
          name={session?.user.name}
          surname={session?.user.surname}
          showOnlyOnPath="/dashboard"
        />
        {showBackBtn && <BackButton />}
        {showingSavingStatus && <SavingStatus />}
        {!hideBreadCrumb && (
          <Breadcrumb
            addManualRoutes={addManualRoutes}
            workspaceHref={workspaceHref}
          />
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
          <SignDocuments />
          {children}
          <div>Notifications</div>
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
