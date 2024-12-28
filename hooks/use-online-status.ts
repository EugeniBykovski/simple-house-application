"use client";

import { useEffect } from "react";

export const useOnlineStatus = () => {
  useEffect(() => {
    const updateStatus = async (isOnline: boolean) => {
      try {
        await fetch("/api/online-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOnline }),
        });
      } catch (error) {
        console.error("Failed to update status", error);
      }
    };

    updateStatus(true);

    const handleBeforeUnload = () => updateStatus(false);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      updateStatus(false);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
