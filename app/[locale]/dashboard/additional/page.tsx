import { FC } from "react";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";

const AdditionalModulesPage: FC = () => {
  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <main className="py-2 px-3 h-full mb-2">
        Buy Extra modules for your application
      </main>
    </>
  );
};

export default AdditionalModulesPage;
