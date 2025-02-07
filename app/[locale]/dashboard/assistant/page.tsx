import { FC } from "react";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";

const AssistantPage: FC = () => {
  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <main className="py-2 px-3 h-full mb-2">AssistantPage</main>
    </>
  );
};

export default AssistantPage;
