"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { HomeUsersCageProps, House, Workspace } from "./types";
import clsx from "clsx";
import { Separator } from "../separator";
import { HouseAddress } from "./ui-fields/house-address";
import { UserDetails } from "./ui-fields/user-details";
import { EntrancesList } from "./ui-fields/entrances-list";

export const HomeUsersCage: FC<HomeUsersCageProps> = ({
  className,
  workspaceId,
}) => {
  const [_, setWorkspace] = useState<Workspace | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/workspace/${workspaceId}/users`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace and house data");
      }

      const data = await res.json();
      setWorkspace(data.workspace);
      setHouse(data.house);
    } catch (error) {
      setError("Failed to load data");
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className={clsx(
        "flex justify-between items-start md:flex-row sm:flex-col rounded-lg p-4 h-full gap-8",
        className
      )}
    >
      <div className="md:w-[40%] sm:w-full flex flex-wrap rounded-md p-4">
        <HouseAddress street={house?.street} houseNumber={house?.houseNumber} />
        <EntrancesList
          entrances={house?.entrances || []}
          onApartmentClick={(user) => setSelectedUser(user)}
        />
      </div>
      <Separator orientation="vertical" />
      <UserDetails user={selectedUser} />
    </div>
  );
};
