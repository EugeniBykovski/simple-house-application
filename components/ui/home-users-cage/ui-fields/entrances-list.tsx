import { FC } from "react";
import { ApartmentCard } from "./apartment-card";

export const EntrancesList: FC<{
  entrances: any[];
  onApartmentClick: (user: any) => void;
}> = ({ entrances, onApartmentClick }) => (
  <>
    {entrances.map((entrance) => (
      <div key={entrance.entranceNumber} className="flex flex-col w-full my-6">
        <h3 className="text-center font-bold text-zinc-500 mb-4">
          Entrance {entrance.entranceNumber}
        </h3>
        <div className="grid grid-cols-2 gap-2 mt-8">
          {entrance.apartments.map((apartment: any) => (
            <ApartmentCard
              key={apartment.apartmentNumber}
              apartmentNumber={apartment.apartmentNumber}
              users={apartment.users}
              onClick={onApartmentClick}
            />
          ))}
        </div>
      </div>
    ))}
  </>
);
