"use client";

import { FC } from "react";
import { Conversation, Message, User } from "@prisma/client";
import { UserAvatar } from "@/components/ui/user-avatar";
import useOtherUsers from "@/hooks/use-other-users";
import { FullConversationType } from "@/types/chats";
import { useSession } from "next-auth/react";

interface ConversationBoxProps {
  conversationId: string;
  conversation?: FullConversationType;
}

const ConversationBox: FC<ConversationBoxProps> = ({
  conversationId,
  conversation,
}) => {
  if (!conversation) {
    return <div className="h-full flex flex-col">Empty conversation</div>;
  }

  return (
    <div className="p-8 h-full">
      <div className="h-full flex flex-col">
        <div className="flex flex-col space-y-2">
          {/* {conversation.length > 0 ? (
            conversation.map((msg) => (
              <div key={msg.id} className="p-2 bg-gray-100 rounded-md">
                <p className="text-xs flex items-center gap-2">
                  <UserAvatar profileImage={msg.image} />
                </p>
                <p className="text-xs text-gray-500">
                  {msg.createdAt ? new Date(msg.createdAt).toISOString() : ""}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-sm">No messages in this chat.</p>
            </div>
          )} */}
          conversation
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
