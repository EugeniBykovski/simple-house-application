import { Theme } from "@/components/settings/theme/Theme";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const ThemeSettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return (
    <>
      <div>DashboardHeader</div>
      <div>AddTaskShortcut</div>
      <Theme />
    </>
  );
};

export default ThemeSettings;
