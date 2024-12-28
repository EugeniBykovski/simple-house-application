"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";

export const OnlineStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useOnlineStatus();
  return <>{children}</>;
};
