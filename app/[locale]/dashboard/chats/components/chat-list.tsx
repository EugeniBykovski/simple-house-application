"use client";

import { FC, useEffect, useState } from "react";
import ConversationBox from "./conversation-box";
import { FullConversationType, FullMessageType } from "@/types/chats";

interface ChatListProps {
  conversation: FullConversationType | null;
  messages: FullMessageType[];
}

const ChatList: FC<ChatListProps> = ({ conversation, messages }) => {
  const [chatMessages, setChatMessages] = useState<FullMessageType[]>(messages);
  const [chatConversation, setChatConversation] =
    useState<FullConversationType | null>(conversation);

  useEffect(() => {
    if (conversation) {
      setChatConversation(conversation);
      setChatMessages(messages);
    }
  }, [conversation, messages]);

  return (
    <div className="w-full flex flex-col items-start p-4">
      {chatConversation ? (
        <ConversationBox
          key={chatConversation.id}
          initialMessages={chatMessages}
        />
      ) : (
        <p className="text-gray-500 text-sm">
          Select a chat to start a conversation
        </p>
      )}
    </div>
  );
};

export default ChatList;
