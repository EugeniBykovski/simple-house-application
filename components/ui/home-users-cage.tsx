"use client";

import { FC, useCallback, useEffect, useState } from "react";

interface HomeUsersCageProps {
  className?: string;
  workspaceId: string;
}

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface Apartment {
  apartmentNumber: number;
  users: User[];
}

interface Entrance {
  entranceNumber: number;
  apartments: Apartment[];
}

interface House {
  entrances: Entrance[];
}

interface Workspace {
  subscribers: { user: User }[];
}

export const HomeUsersCage: FC<HomeUsersCageProps> = ({
  className,
  workspaceId,
}) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [_, setError] = useState<string | null>(null);

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
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={className}>
      <h2 className="text-lg font-bold mb-4">Workspace Subscribers</h2>
      <ul className="mb-8">
        {workspace?.subscribers.map((subscriber) => (
          <li key={subscriber.user.id} className="mb-2">
            {subscriber.user.name} {subscriber.user.surname} -{" "}
            {subscriber.user.email}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mb-4">Users in the same House</h2>
      <ul>
        {house?.entrances.map((entrance) => (
          <li key={entrance.entranceNumber} className="mb-4">
            <p className="font-semibold">Entrance {entrance.entranceNumber}</p>
            <ul>
              {entrance.apartments.map((apartment) => (
                <li key={apartment.apartmentNumber} className="mb-2">
                  <p className="text-sm">
                    Apartment {apartment.apartmentNumber}
                  </p>
                  <ul>
                    {apartment.users.map((user) => (
                      <li key={user.id}>
                        {user.name} {user.surname} - {user.email}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
