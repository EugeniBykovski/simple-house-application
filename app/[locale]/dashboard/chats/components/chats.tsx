"use client";

import { FC, useState } from "react";
import { User } from "@prisma/client";
import ChatsTitles from "./chats-titles";
import ChatsUsersList from "./chats-users-list";
import ChatList from "./chat-list";
import ConversationHeader from "./conversation-header";
import { FullConversationType, FullMessageType } from "@/types/chats";

interface ChatsProps {
  currentUser: User;
  users: User[];
  conversations: FullConversationType[];
  conversation?: FullConversationType | null;
  messages: FullMessageType[];
}

const Chats: FC<ChatsProps> = ({ currentUser, conversations }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === activeChat
  );

  return (
    <div className="flex flex-col gap-4 w-full items-center h-full">
      <ChatsTitles />
      <div className="flex justify-between items-start gap-2 w-full h-full">
        <div className="w-full flex justify-between h-full gap-4">
          <ChatsUsersList
            setActiveChat={setActiveChat}
            conversations={conversations}
            currentUser={currentUser}
          />
          <div className="bg-neutral-50 w-full px-2 py-6 flex flex-col justify-start rounded-lg shadow-md">
            <ConversationHeader
              currentUser={currentUser}
              conversation={selectedConversation ?? null}
            />
            {selectedConversation ? (
              <ChatList conversations={conversations} />
            ) : (
              <p className="text-gray-500 text-sm flex justify-center h-full items-center">
                Select a chat to start a conversation
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
