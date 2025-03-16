"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const useOnlineStatus = () => {
  const { data: session } = useSession();
  const token = session?.expires;

  useEffect(() => {
    const updateStatus = async (isOnline: boolean) => {
      try {
        await fetch("/api/online-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ isOnline }),
        });
      } catch (error) {
        console.error("Failed to update status", error);
      }
    };

    if (token) {
      updateStatus(true);
    }

    const handleBeforeUnload = () => {
      if (token) {
        updateStatus(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (token) {
        updateStatus(false);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [token]);
};
