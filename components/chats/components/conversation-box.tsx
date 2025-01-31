"use client";

import { FC } from "react";
import { Conversation, Message } from "@prisma/client";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ConversationBoxProps {
  conversationId: string;
  conversation?: Conversation | null;
  messages: Message[];
}

const ConversationBox: FC<ConversationBoxProps> = ({
  conversationId,
  conversation,
  messages,
}) => {
  if (!conversation) {
    return <div className="h-full flex flex-col">Empty conversation</div>;
  }

  return (
    <div className="p-8 h-full">
      <div className="h-full flex flex-col">
        <div className="flex flex-col space-y-2">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="p-2 bg-gray-100 rounded-md">
                <p className="text-xs flex items-center gap-2">
                  <UserAvatar profileImage={msg.image} />
                  {msg.body}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
