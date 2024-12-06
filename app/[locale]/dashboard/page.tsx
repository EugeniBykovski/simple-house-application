import Welcoming from "@/components/common/Welcoming/Welcoming";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");

  return (
    <>
      <DashboardHeader />
      <div className="h-[100vh] w-full relative flex flex-col justify-between">
        <div className="p-4">
          <Welcoming
            hideOnDesktop
            className="px-4 py-2"
            username={session.user.username!}
            name={session.user.name}
            surname={session.user.surname}
          />
          HomeRecentActivityContainer
        </div>
      </div>
    </>
  );
};

export default Dashboard;
