"use client";

import { FC, useEffect, useState } from "react";
import { User } from "@prisma/client";
import ChatsTitles from "./chats-titles";
import ChatsUsersList from "./chats-users-list";
import ChatList from "./chat-list";
import ConversationHeader from "./conversation-header";
import { FullConversationType, FullMessageType } from "@/types/chats";
import ChatForm from "./chat-form";

interface ChatsProps {
  currentUser: User;
  users: User[];
  conversations: FullConversationType[];
}

const Chats: FC<ChatsProps> = ({ currentUser, conversations }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>(currentUser);
  const [messages, setMessages] = useState<FullMessageType[]>([]);

  useEffect(() => {
    if (!activeChat && conversations.length > 0) {
      setActiveChat(conversations[0].id); // Устанавливаем первый чат активным
      const firstParticipant = conversations[0].participants.find(
        (user) => user.id !== currentUser.id
      );
      if (firstParticipant) {
        setSelectedUser(firstParticipant);
      }
    }
  }, [activeChat, conversations, currentUser]);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === activeChat
  );

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(
        `/api/messages?conversationId=${conversationId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat);
    }
  }, [activeChat]);

  return (
    <div className="flex flex-col gap-4 w-full items-center h-full">
      <ChatsTitles />
      <div className="flex justify-between items-start gap-2 w-full h-full">
        <div className="w-full flex justify-between h-full gap-4">
          <ChatsUsersList
            setActiveChat={setActiveChat}
            conversations={conversations}
            currentUser={currentUser}
            setCurrentUser={setSelectedUser}
          />
          <div className="bg-neutral-50 w-full px-2 py-6 flex flex-col justify-start relative rounded-lg shadow-md">
            <ConversationHeader
              currentUser={currentUser}
              conversation={selectedConversation ?? null}
            />
            {selectedConversation ? (
              <ChatList
                conversation={selectedConversation}
                messages={messages}
              />
            ) : (
              <p className="text-gray-500 text-sm flex justify-center h-full items-center">
                Select a chat to start a conversation
              </p>
            )}
            <ChatForm recipientId={selectedUser?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
