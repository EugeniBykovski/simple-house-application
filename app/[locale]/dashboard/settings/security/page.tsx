import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const SecuritySettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return (
    <>
      <div>DashboardHeader</div>
      <div>AddTaskShortcut</div>
      <div>SecurityCard</div>
    </>
  );
};

export default SecuritySettings;
