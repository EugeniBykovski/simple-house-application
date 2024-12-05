import { DashboardHeader } from "@/components/header/DashboardHeader";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");

  return (
    <>
      <DashboardHeader />
      <div className="h-[100vh] w-full relative flex flex-col justify-between">
        <div className="p-4">Welcoming HomeRecentActivityContainer</div>
      </div>
    </>
  );
};

export default Dashboard;
