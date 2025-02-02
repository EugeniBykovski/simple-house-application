"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import useConversation from "@/hooks/use-conversation";
import ConversationBox from "./conversation-box";
import { FullConversationType } from "@/types/chats";

interface ChatListProps {
  conversations: FullConversationType[];
}

const ChatList: FC<ChatListProps> = ({ conversations }) => {
  const [chatConversations, setChatConversations] =
    useState<FullConversationType[]>(conversations);
  const { conversationId } = useConversation();

  const selectedConversation = chatConversations.find(
    (conv) => conv.id === conversationId
  );

  useEffect(() => {
    if (!conversationId) return;

    axios
      .get<{ conversations: FullConversationType[] }>(
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
        />
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default ChatList;
