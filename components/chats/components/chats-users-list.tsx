"use client";

import { FC } from "react";
import { User, Conversation } from "@prisma/client";
import ChatsUserBox from "./chats-user-box";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface ChatsUsersListProps {
  users: User[];
  setActiveChat: (id: string) => void;
  conversations: ExtendedConversation[];
}

const ChatsUsersList: FC<ChatsUsersListProps> = ({
  users,
  setActiveChat,
  conversations,
}) => {
  return (
    <div className="w-[20%] flex-col rounded-lg bg-zinc-50 py-6 px-2 flex justify-start gap-1 shadow-md text-sm text-zinc-600">
      {users.map((user) => (
        <ChatsUserBox
          key={user.id}
          data={user}
          setActiveChat={setActiveChat}
          conversations={conversations}
        />
      ))}
    </div>
  );
};

export default ChatsUsersList;
