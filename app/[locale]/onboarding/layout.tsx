import { LocaleSwitcher } from "@/components/switchers/LocaleSwitcher/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher/ThemeSwitcher";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full">
      <div className="fixed top-0 left-0 w-full flex justify-end z-10">
        <div className="flex items-center gap-2 p-4">
          <LocaleSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
          <ThemeSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
        </div>
      </div>
      {children}
    </main>
  );
};

export default OnboardingLayout;
