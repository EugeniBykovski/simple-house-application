import { AdditionalInfoSection } from "@/components/onboarding/AdditionalInfoSection";
import { SummarySection } from "@/components/onboarding/SummarySection";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");

  return (
    <OnboardingFormProvider session={session}>
      <AdditionalInfoSection />
      <SummarySection />
    </OnboardingFormProvider>
  );
};

export default Onboarding;
