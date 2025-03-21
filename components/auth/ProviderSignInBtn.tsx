"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useProviderLoginError } from "@/hooks/useProviderLoginError";
import { signIn } from "next-auth/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  providerName: "google";
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProviderSignInBtn = ({
  children,
  providerName,
  onLoading,
  ...props
}: Props) => {
  const [showLoggedInfo, setShowLoggedInfo] = useState(false);
  const requestLocale = useLocale();

  useProviderLoginError(showLoggedInfo);

  const signInHandler = async () => {
    onLoading(true);
    setShowLoggedInfo(true);
    try {
      await signIn(providerName, {
        callbackUrl: `/${requestLocale}/onboarding`,
      });
    } catch (err) {}
    onLoading(false);
  };

  return (
    <Button
      onClick={signInHandler}
      {...props}
      variant={"secondary"}
      type="button"
    >
      {children}
    </Button>
  );
};
