import { flat } from "@/public/assets";
import Image from "next/image";
import { FC } from "react";

export const ApartmentCard: FC<{
  apartmentNumber: number;
  users: any[];
  onClick: (user: any) => void;
}> = ({ apartmentNumber, users, onClick }) => (
  <div className="rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer transition hover:shadow-md hover:bg-orange-300 hover:-translate-y-1 relative h-full">
    <Image
      src={flat}
      alt="flat"
      onClick={() => users.length > 0 && onClick(users[0])}
      className="scale-150 z-0"
    />

    <div className="absolute font-bold text-orange-500 z-10 top-0 -right-5 rotate-45 text-4xl">
      №<span>{apartmentNumber}</span>
    </div>
  </div>
);
