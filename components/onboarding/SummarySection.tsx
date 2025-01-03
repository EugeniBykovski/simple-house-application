"use client";

import { useOnboardingForm } from "@/context/OnboardingForm";
import { UserAvatar } from "@/components/ui/user-avatar";

export const SummarySection = () => {
  const { name, surname, profileImage, address, currentStep } =
    useOnboardingForm();

  return (
    <section className="hidden lg:w-1/2 bg-primary lg:flex justify-center items-center">
      {currentStep < 3 && (
        <div className="bg-card rounded-2xl w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5">
          <UserAvatar
            className="w-28 h-28 shadow-sm mt-[-5rem]"
            size={30}
            profileImage={profileImage}
          />
          <div className="text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold">
            {name && <p>{name}</p>}
            {surname && <p>{surname}</p>}
          </div>
          {!address && <span className="bg-muted rounded-md w-24 h-8"></span>}
          {address && (
            <p>
              {address.street}, {address.houseNumber}, {address.entranceNumber},{" "}
              {address.apartmentNumber}
            </p>
          )}
        </div>
      )}
    </section>
  );
};
