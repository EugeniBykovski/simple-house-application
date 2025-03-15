import Welcoming from "@/components/common/Welcoming/Welcoming";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { SwitchAccountType } from "./settings/billing/switch-account-type/SwitchAccountType";
import HouseUsersLayout from "@/components/ui/home-users-cage/house-users-layout";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");

  return (
    <>
      <DashboardHeader />
      <div className="h-[100vh] w-full relative flex flex-col justify-between">
        <div className="px-4">
          <div className="flex justify-between items-center bg-zinc-50 rounded-lg px-4 py-2 mb-4">
            <Welcoming
              hideOnDesktop
              username={session.user.username!}
              name={session.user.name}
              surname={session.user.surname}
            />
            <SwitchAccountType />
          </div>
          <HouseUsersLayout session={session} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
