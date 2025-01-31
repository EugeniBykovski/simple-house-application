"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Conversation, Message, User } from "@prisma/client";
import useConversation from "@/hooks/use-conversation";
import ConversationBox from "./conversation-box";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface ChatListProps {
  conversations: ExtendedConversation[];
  conversation?: Conversation | null;
  messages: Message[];
}

const ChatList: FC<ChatListProps> = ({
  conversations,
  conversation,
  messages,
}) => {
  const [chatConversations, setChatConversations] =
    useState<ExtendedConversation[]>(conversations);
  const { conversationId } = useConversation();
  const selectedConversation = chatConversations.find(
    (conv) => conv.id === conversationId
  );

  useEffect(() => {
    if (!conversationId) return;

    axios
      .get<{ conversations: ExtendedConversation[] }>(
        `/api/conversations/${conversationId}`
      )
      .then((response) => setChatConversations(response.data.conversations))
      .catch((error) => console.error("Error loading messages:", error));
  }, [conversationId]);

  return (
    <div className="w-full flex flex-col items-start p-4">
      {selectedConversation ? (
        <ConversationBox
          key={selectedConversation.id}
          conversationId={selectedConversation.id}
          conversation={selectedConversation}
          messages={messages}
        />
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default ChatList;
