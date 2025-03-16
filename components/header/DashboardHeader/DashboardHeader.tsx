import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { User } from "../User/User";
import { BackButton } from "../BackButton";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import Welcoming from "../../common/Welcoming/Welcoming";
import { SavingStatus } from "../SavingStatus";
import { OpenSidebar } from "../OpenSidebar";
import { DashboardHeaderProps } from "./types";
import { SignDocuments } from "../SignDocuments/SignDocuments";
import { MeetingsTrigger } from "../MeetingsTrigger/MeetingsTrigger";
import { Logo } from "@/components/common/Logo/Logo";
import { Separator } from "@/components/ui/separator";
import Billing from "../Billing/Billing";
import { BellRing } from "lucide-react";

export const DashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
  showBackBtn,
}: DashboardHeaderProps) => {
  let session = await getAuthSession();

  if (!session) {
    session = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      user: {
        id: "fake-user-id",
        username: "Guest",
        name: "Guest",
        surname: "User",
        email: "guest@example.com",
        image: null,
        isOnline: false,
        completedOnboarding: false,
      },
    };
  }

  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mb-4 p-4 gap-2 shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Logo />
        <Separator orientation="vertical" className="h-6 ml-1" />
        <OpenSidebar />
        <Welcoming
          hideOnMobile
          hideOnDesktop
          surname={session.user.username}
          name={session.user.name}
          showOnlyOnPath="/dashboard"
          username={session.user.name ?? ""}
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
          {children}
          <SignDocuments />
          <MeetingsTrigger />
          <Billing />
          <div className="p-2 rounded-lg mr-2 cursor-pointer transition relative">
            <BellRing className="w-5 h-5 text-orange-400 hover:text-orange-300 transition cursor-pointer" />
            <div className="w-4 h-4 flex justify-center items-center bg-orange-400 absolute rounded-full -right-2 -top-1">
              <span className="text-[9px] text-white">1</span>
            </div>
          </div>
        </div>
        <User
          profileImage={session.user.image}
          username={session.user.username ?? "Guest"}
          email={session.user.email ?? "guest@example.com"}
          isOnline={session.user.isOnline}
        />
      </div>
    </header>
  );
};
