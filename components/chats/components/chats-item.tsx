"use client";

import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface ChatsItemProps {
  label: string;
  Icon: LucideIcon;
  href: string;
  active?: boolean;
}

const ChatsItem: FC<ChatsItemProps> = ({ Icon, active }) => {
  return (
    <li className="cursor-pointer w-full flex justify-center">
      <div
        className={clsx(
          `group flex gap-x-2 items-center rounded-md p-1 text-sm text-zinc-400 hover:text-zinc-300 transition`,
          active && "text-green-400"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
      </div>
    </li>
  );
};

export default ChatsItem;
