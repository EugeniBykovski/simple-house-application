import { FC } from "react";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import { PaymentDetails } from "@/components/settings/paymentDetails/PaymentDetails";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const AdvertsBlock: FC = async () => {
  const session = await checkIfUserCompletedOnboarding(
    "/dashboard/settings/paymentDetails"
  );

  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <PaymentDetails session={session} />
    </>
  );
};

export default AdvertsBlock;
