import { FC } from "react";
import { ApartmentCard } from "./apartment-card";

export const EntrancesList: FC<{
  entrances: any[];
  onApartmentClick: (user: any) => void;
}> = ({ entrances, onApartmentClick }) => {
  return (
    <>
      {entrances.map((entrance) => {
        const floors = Array.from(
          new Set(
            entrance.apartments.map((apartment: any) =>
              typeof apartment.floor === "string" ? apartment.floor : "0"
            )
          )
        ).sort((a, b) => parseInt(a as string, 10) - parseInt(b as string, 10));

        return (
          <div
            key={entrance.entranceNumber}
            className="flex flex-col w-full my-6"
          >
            <h3 className="text-center font-bold text-zinc-500 mb-4">
              Entrance {entrance.entranceNumber}
            </h3>
            <div className="flex flex-col gap-6">
              {floors.map((floor) => {
                const apartmentsOnFloor = entrance.apartments.filter(
                  (apartment: any) => apartment.floor === floor
                );

                return (
                  <div
                    key={`floor-${floor}`}
                    className="flex flex-col items-center"
                  >
                    <h4 className="text-center font-semibold text-zinc-400">
                      Floor - {floor as string}
                    </h4>
                    <div className="grid grid-cols-2 gap-8 mt-4">
                      {apartmentsOnFloor.length > 0 ? (
                        apartmentsOnFloor.map((apartment: any) => (
                          <ApartmentCard
                            key={`apartment-${apartment.apartmentNumber}`}
                            apartmentNumber={apartment.apartmentNumber}
                            users={apartment.users}
                            onClick={onApartmentClick}
                          />
                        ))
                      ) : (
                        <div className="w-20 h-20 border border-dashed border-zinc-300 flex items-center justify-center text-sm text-zinc-400">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
