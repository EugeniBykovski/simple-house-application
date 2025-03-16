"use client";

import { useApartment } from "@/context/ApartmentContext";
import { FC, useEffect, useState } from "react";
import { HomeUsersCage } from "./home-users-cage";

interface HouseUsersLayoutProps {
  session: any;
}

const HouseUsersLayout: FC<HouseUsersLayoutProps> = ({ session }) => {
  const { selectedApartment } = useApartment();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fakeUser = {
    user: {
      id: "fake-user-id",
      name: "Guest User",
      email: "guest@example.com",
    },
  };

  const currentSession = session || fakeUser;

  useEffect(() => {
    if (!selectedApartment) return;

    const fetchWorkspaceId = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/user/${currentSession.user.id}/workspace`
        );
        if (!res.ok) throw new Error("Failed to fetch workspace");
        const data = await res.json();

        if (!data.workspaceIds || data.workspaceIds.length === 0) {
          throw new Error("No workspace found");
        }

        setWorkspaceId(data.workspaceIds[0]);
      } catch (error) {
        console.error("Error fetching workspaceId:", error);
        setError("Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceId();
  }, [selectedApartment]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!workspaceId) return null;

  return <HomeUsersCage key={workspaceId} workspaceId={workspaceId} />;
};

export default HouseUsersLayout;
