import { FC } from "react";
import Image from "next/image";

export const UserDetails: FC<{ user?: any }> = ({ user }) => (
  <div className="flex flex-col w-full rounded-md h-full p-4">
    <h2 className="text-lg font-bold mb-4 text-orange-400 border-b pb-2">
      User Details:
    </h2>
    {user ? (
      <>
        <p className="text-zinc-600 font-semibold flex justify-center mb-4">
          <Image
            src={user.image}
            alt={`${user.name} ${user.surname}`}
            className="rounded-md"
            width={84}
            height={84}
          />
        </p>
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-start gap-4 mb-2">
            <p className="text-zinc-600 font-semibold">
              <span className="mr-1 text-sm text-zinc-400">Name:</span>
              {user.name}
            </p>
            <p className="text-zinc-600 font-semibold">
              <span className="mr-1 text-sm text-zinc-400">Surname:</span>
              {user.surname}
            </p>
            <p className="text-zinc-600 font-semibold">
              <span className="mr-1 text-sm text-zinc-400">Username:</span>
              {user.username}
            </p>
          </div>
          <div className="flex items-center justify-start gap-4 mb-4">
            <p className="text-zinc-600 font-semibold">
              <span className="mr-1 text-sm text-zinc-400">Email:</span>
              {user.email}
            </p>
          </div>
        </div>
      </>
    ) : (
      <p className="text-gray-400">Select an apartment to view details</p>
    )}
  </div>
);
