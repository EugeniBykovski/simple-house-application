import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import { PaymentDetails } from "@/components/settings/paymentDetails/PaymentDetails";

const AdvertsBlock = () => {
  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <PaymentDetails />
    </>
  );
};

export default AdvertsBlock;
