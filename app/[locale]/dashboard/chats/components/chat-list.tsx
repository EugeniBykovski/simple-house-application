"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import useConversation from "@/hooks/use-conversation";
import ConversationBox from "./conversation-box";
import { FullConversationType, FullMessageType } from "@/types/chats";

interface ChatListProps {
  conversations: FullConversationType[];
  messages: FullMessageType[];
}

const ChatList: FC<ChatListProps> = ({ conversations, messages }) => {
  const [chatConversations, setChatConversations] =
    useState<FullConversationType[]>(conversations);
  const { conversationId, setConversationId } = useConversation();
  const [_, setMessages] = useState<FullMessageType[]>([]);

  useEffect(() => {
    if (!conversationId && conversations.length > 0) {
      setConversationId(conversations[0].id);
    }
  }, [conversationId, conversations, setConversationId]);

  useEffect(() => {
    if (!conversationId) return;

    axios
      .get<{ messages: FullMessageType[] }>(`/api/messages/${conversationId}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => console.error("❌ Error loading messages:", error));
  }, [conversationId]);

  const selectedConversation = chatConversations.find(
    (conv) => conv.id === conversationId
  );

  return (
    <div className="w-full flex flex-col items-start p-4">
      {selectedConversation ? (
        <ConversationBox
          key={selectedConversation.id}
          initialMessages={messages}
        />
      ) : (
        <p className="text-gray-500 text-sm">No messages yet</p>
      )}
    </div>
  );
};

export default ChatList;
