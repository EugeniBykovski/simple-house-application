import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import { Heading } from "@/components/settings/account/Heading/Heading";
import { AccountInfo } from "@/components/settings/account/AccountInfo/AccountInfo";
import { DeleteAccount } from "@/components/settings/account/DeleteAccount/DeleteAccount";

const SettingsPage: FC = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <main className="py-2 px-3">
        <Heading />
        <AccountInfo session={session} />
        <div className="py-6">
          <Separator />
        </div>
        <DeleteAccount userEmail={session.user.email!} />
      </main>
    </>
  );
};

export default SettingsPage;
