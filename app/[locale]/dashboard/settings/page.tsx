import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { DashboardHeader } from "@/components/header/DashboardHeader";

const SettingsPage: FC = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <main>
        <div>Heading</div>
        <div>AccountInfo</div>
        <div className="p-4 sm:p-6">
          <Separator />
        </div>
        <div>DeleteAccount</div>
      </main>
    </>
  );
};

export default SettingsPage;
