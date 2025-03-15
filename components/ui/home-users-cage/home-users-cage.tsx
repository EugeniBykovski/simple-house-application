"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { HomeUsersCageProps, House, Workspace } from "./types";
import clsx from "clsx";
import { Separator } from "../separator";
import { HouseAddress } from "./ui-fields/house-address";
import { UserDetails } from "./ui-fields/user-details";
import { EntrancesList } from "./ui-fields/entrances-list";
import { useApartment } from "@/context/ApartmentContext";

export const HomeUsersCage: FC<HomeUsersCageProps> = ({
  className,
  workspaceId,
}) => {
  const { selectedApartment } = useApartment();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!selectedApartment || !workspaceId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/workspace/${workspaceId}/users?apartmentId=${selectedApartment.id}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch workspace and house data");
      }

      const data = await res.json();
      setWorkspace(data.workspace);
      setHouse(data.house);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [workspaceId, selectedApartment]);

  useEffect(() => {
    if (workspaceId) fetchData();
  }, [fetchData, workspaceId]);

  return (
    <div
      className={clsx(
        "flex justify-between items-start rounded-lg p-4 h-full gap-8",
        className
      )}
    >
      <div className="md:w-[40%] sm:w-full flex flex-wrap rounded-md p-4">
        <HouseAddress street={house?.street} houseNumber={house?.houseNumber} />

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !house?.entrances?.length && (
          <p className="text-center text-gray-400">No apartments found.</p>
        )}

        {!loading && house?.entrances?.length && (
          <EntrancesList
            key={house?.street}
            entrances={house.entrances}
            onApartmentClick={setSelectedUser}
          />
        )}
      </div>
      <Separator orientation="vertical" />
      <UserDetails user={selectedUser} />
    </div>
  );
};
