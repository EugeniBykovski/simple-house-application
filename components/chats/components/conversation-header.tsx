"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { Conversation, Message, User } from "@prisma/client";
import { FC, useMemo } from "react";

interface ConversationHeaderProps {
  conversation: Conversation & {
    participants?: User[];
  };
}

const ConversationHeader: FC<ConversationHeaderProps> = ({ conversation }) => {
  const participantImages =
    conversation.participants?.map((user) => user.image).filter(Boolean) ?? [];
  const singleUserImage =
    participantImages.length > 0 ? participantImages[0] : undefined;

  const statusMsg = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.participants?.length ?? 0} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex-col flex items-start border-b-[1px] rounded-lg py-2 px-3 justify-between shadow-sm mb-4">
      <div className="flex gap-3 items-center">
        {conversation.isGroup ? (
          participantImages
            .slice(0, 3)
            .map((image, index) => (
              <UserAvatar key={index} profileImage={image} />
            ))
        ) : (
          <UserAvatar profileImage={singleUserImage} className="w-10 h-10" />
        )}
        <span className="font-bold text-sm text-zinc-600">
          {conversation.name ?? "Direct Chat"}
        </span>
        <span className="text-xs text-green-500">{statusMsg}</span>
      </div>
    </div>
  );
};

export default ConversationHeader;
