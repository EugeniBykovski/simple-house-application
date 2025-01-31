"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";
import { UserAvatar } from "@/components/ui/user-avatar";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface ChatsUserBoxProps {
  data: User;
  setActiveChat: (id: string) => void;
  conversations: ExtendedConversation[];
}

const ChatsUserBox: FC<ChatsUserBoxProps> = ({
  data,
  setActiveChat,
  conversations,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const userConversation = useMemo(() => {
    return conversations.find((conv) =>
      conv.participants.some((user) => user.id === data.id)
    );
  }, [conversations, data.id]);

  const lastMessage = useMemo(() => {
    if (!userConversation?.messages || userConversation.messages.length === 0) {
      return null;
    }

    return [...userConversation.messages]
      .filter((msg) => msg.body || msg.image)
      .pop();
  }, [userConversation]);

  const userEmail = session.data?.user?.email || "";

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    return lastMessage.seen?.some((user) => user.email === userEmail) || false;
  }, [userEmail, lastMessage]);

  const lastMessageText = lastMessage?.image
    ? "Sent an image"
    : lastMessage?.body || "Started a conversation";

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((response) => {
        setActiveChat(response.data.id);
      })
      .finally(() => setIsLoading(false));
  }, [data, setActiveChat]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <UserAvatar profileImage={data.image} className="w-8 h-8" />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-start flex-col">
            <p className="text-xs font-medium">
              {data.name} {data.surname}
            </p>
            <p
              className={clsx(
                `text-xs truncate`,
                hasSeen ? "text-gray-400" : "text-gray-700"
              )}
            >
              {lastMessageText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsUserBox;
