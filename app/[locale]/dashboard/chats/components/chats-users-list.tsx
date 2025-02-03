"use client";

import { FC } from "react";
import { User } from "@prisma/client";
import ChatsUserBox from "./chats-user-box";
import { FullConversationType } from "@/types/chats";

interface ChatsUsersListProps {
  setActiveChat: any;
  conversations: FullConversationType[];
  currentUser: User;
}

const ChatsUsersList: FC<ChatsUsersListProps> = ({
  setActiveChat,
  conversations,
  currentUser,
}) => {
  return (
    <div className="w-[20%] flex-col rounded-lg bg-zinc-50 py-6 px-2 flex justify-start gap-1 shadow-md text-sm text-zinc-600">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <ChatsUserBox
            key={conversation.id}
            conversation={conversation}
            setActiveChat={setActiveChat}
            currentUser={currentUser}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center w-full">
          No conversations yet
        </p>
      )}
    </div>
  );
};

export default ChatsUsersList;
