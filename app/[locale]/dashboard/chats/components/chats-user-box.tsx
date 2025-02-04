"use client";

import { FC, useCallback, useMemo } from "react";
import { User } from "@prisma/client";
import { UserAvatar } from "@/components/ui/user-avatar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/types/chats";
import { ClockAlert } from "lucide-react";

interface ChatsUserBoxProps {
  conversation: FullConversationType;
  setActiveChat: (id: string) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

const ChatsUserBox: FC<ChatsUserBoxProps> = ({
  setActiveChat,
  conversation,
  currentUser,
  setCurrentUser,
}) => {
  const session = useSession();
  const userEmail = session.data?.user?.email || "";

  const otherParticipant = useMemo(() => {
    return conversation.participants.find((user) => user.id !== currentUser.id);
  }, [conversation.participants, currentUser]);

  const handleClick = useCallback(() => {
    setActiveChat(conversation.id);
    if (otherParticipant) {
      setCurrentUser(otherParticipant);
    }
  }, [conversation.id, setActiveChat, otherParticipant, setCurrentUser]);

  const lastMessage = useMemo(() => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return null;
    }

    return [...conversation.messages]
      .filter((msg) => msg.body || msg.image)
      .pop();
  }, [conversation.messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    return lastMessage.seen?.some((user) => user.email === userEmail) || false;
  }, [userEmail, lastMessage]);

  const lastMessageText = lastMessage?.image
    ? "Sent an image"
    : lastMessage?.body || "Started a conversation";

  const formattedDate = lastMessage?.createdAt ? (
    format(new Date(lastMessage.createdAt), "p")
  ) : (
    <ClockAlert className="w-3 h-3" />
  );

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <UserAvatar
        profileImage={
          conversation.isGroup
            ? "/default-group-avatar.png"
            : otherParticipant?.image
        }
        className="w-8 h-8"
      />
      <div className="flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-start flex-col">
            <div className="text-xs font-medium flex justify-between items-center w-full">
              {conversation.isGroup
                ? conversation.name
                : otherParticipant?.name}

              <span className="text-zinc-300">{formattedDate}</span>
            </div>
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
