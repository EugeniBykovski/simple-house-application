import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import Apartments from "@/components/settings/apartments/Apartments";

const ApartmentsPage = () => {
  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <Apartments />
    </>
  );
};

export default ApartmentsPage;
