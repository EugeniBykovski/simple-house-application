"use client";

import { FC } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Conversation, User } from "@prisma/client";

interface ConversationHeaderProps {
  conversation: Conversation | null;
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

  const statusMsg = conversation.isGroup ? `${conversation} members` : "Active";

  return (
    <div className="bg-white w-full flex flex-col items-start border-b-[1px] rounded-lg py-2 px-3 justify-between shadow-sm mb-4">
      <div className="flex gap-3 items-center">
        <UserAvatar profileImage={currentUser.image} className="w-10 h-10" />
        <span className="font-bold text-sm text-zinc-600">
          {conversation.name ?? "Direct Chat"}
        </span>
        <span className="text-xs text-green-500">{statusMsg}</span>
      </div>
    </div>
  );
};

export default ConversationHeader;
