import { FC } from "react";

export const HouseAddress: FC<{ street?: string; houseNumber?: string }> = ({
  street,
  houseNumber,
}) => (
  <div className="w-full">
    <h3 className="font-bold text-lg text-orange-400 flex justify-center items-start sm:flex-col md:flex-row gap-2 w-full border-b pb-2">
      House address:
      <span className="text-md text-zinc-600">
        {street} {houseNumber}
      </span>
    </h3>
  </div>
);
