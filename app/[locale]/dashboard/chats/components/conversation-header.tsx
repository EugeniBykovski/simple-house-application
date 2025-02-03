"use client";

import { FC } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { User } from "@prisma/client";
import { FullConversationType } from "@/types/chats";

interface ConversationHeaderProps {
  conversation: FullConversationType | null;
  currentUser: User;
}

const ConversationHeader: FC<ConversationHeaderProps> = ({
  conversation,
  currentUser,
}) => {
  if (!conversation) {
    return (
      <div className="bg-white w-full flex flex-col items-start border-b-[1px] rounded-lg py-2 px-3 justify-between shadow-sm mb-4">
        <span className="text-sm text-gray-500">No conversation selected</span>
      </div>
    );
  }

  const statusMsg = conversation.isGroup
    ? `${conversation.participants.length} members`
    : "Active";

  const otherUser = conversation.participants.find(
    (user) => user.id !== currentUser.id
  );

  return (
    <div className="bg-white w-full flex flex-col items-start border-b-[1px] rounded-lg py-2 px-3 justify-between shadow-sm mb-4">
      <div className="flex gap-3 items-center">
        <UserAvatar profileImage={otherUser?.image} className="w-10 h-10" />
        <span className="font-bold text-sm text-zinc-600">
          {conversation.name ?? "Direct Chat"}
        </span>
        <div className="flex gap-x-1 text-xs">
          (<span>{otherUser?.username}</span>
          <span>{otherUser?.surname}</span>
          <span>{otherUser?.email}</span>)
        </div>
        <span className="text-xs text-green-500">{statusMsg}</span>
      </div>
    </div>
  );
};

export default ConversationHeader;
