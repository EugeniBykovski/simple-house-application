import { flat } from "@/public/assets";
import Image from "next/image";
import { FC } from "react";

export const ApartmentCard: FC<{
  apartmentNumber: number;
  users: any[];
  onClick: (user: any) => void;
}> = ({ apartmentNumber, users, onClick }) => (
  <div className="rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer transition hover:shadow-md h-full">
    <div
      onClick={() => users.length > 0 && onClick(users[0])}
      className="scale-150 z-0 w-20 h-20 flex justify-center items-center bg-zinc-50 rounded-lg"
    >
      <p className="font-bold text-zinc-500 text-lg">{apartmentNumber}</p>
    </div>
  </div>
);
