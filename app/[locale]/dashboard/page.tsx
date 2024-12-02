import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");

  return (
    <>
      DashboardHeader
      <main className="h-full w-full">
        Welcoming HomeRecentActivityContainer
      </main>
    </>
  );
};

export default Dashboard;
