"use client";

import { FC, useRef } from "react";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/types/chats";
import clsx from "clsx";
import { format } from "date-fns";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);

  if (!data || !data.sender) {
    return null;
  }

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex flex-col p-4 w-full", isOwn && "justify-end");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-300 text-white" : "bg-gray-100",
    data?.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name || "Unknown"}
          </div>
          <div className="text-xs text-gray-300">
            {data.createdAt ? format(new Date(data.createdAt), "p") : ""}
          </div>
        </div>
        <div className={message}>
          <div>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
