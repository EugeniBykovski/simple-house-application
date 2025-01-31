"use client";

import { FC, useState } from "react";
import { Conversation, Message, User } from "@prisma/client";
import ChatsSidebar from "./components/chats-sidebar";
import ChatsTitles from "./components/chats-titles";
import ChatsUsersList from "./components/chats-users-list";
import ChatList from "./components/chat-list";
import ConversationHeader from "./components/conversation-header";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface ChatsProps {
  currentUser: User;
  users: User[];
  conversations: ExtendedConversation[];
  conversation?: Conversation | null;
  messages: Message[];
}

const Chats: FC<ChatsProps> = ({
  currentUser,
  users,
  conversations,
  conversation,
  messages,
}) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <ChatsTitles />
      <div className="flex justify-between items-start gap-2 w-full h-full">
        <ChatsSidebar />
        <div className="w-full flex justify-between h-full gap-2">
          <ChatsUsersList
            users={users}
            setActiveChat={setActiveChat}
            conversations={conversations}
          />
          <div className="bg-neutral-50 w-full px-2 py-6 flex flex-col justify-start rounded-lg shadow-md">
            <ConversationHeader
              currentUser={currentUser}
              conversation={conversation ?? ({} as Conversation)}
            />
            {activeChat ? (
              <ChatList
                conversations={conversations}
                conversation={conversation ?? ({} as Conversation)}
                messages={messages}
              />
            ) : (
              <p className="text-gray-500 text-sm flex justify-center h-full items-center">
                Select a chat to start conversation
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
