"use client";

import { FC } from "react";
import { DraggablePanel } from "@/components/dashboard/DraggablePanel/DraggablePanel";
import MeetingsPanel from "@/components/dashboard/MeetingsPanel/MeetingsPanel";
import { HelperDesk } from "@/components/helperdesk/HelperDesk";
import { AdvertsTextSlider } from "@/components/ui/adverts-text-slider";
import { Conversation, Message, User } from "@prisma/client";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface CommonToolsProps {
  currentUser: User;
  users: User[];
  conversations: ExtendedConversation[];
  conversation?: Conversation | null;
  messages: Message[];
}

export const CommonTools: FC<CommonToolsProps> = ({
  currentUser,
  users,
  conversations,
  conversation,
  messages,
}) => (
  <>
    <div className="flex flex-col justify-center relative">
      <AdvertsTextSlider className="absolute bottom-10 z-0" />
      <DraggablePanel
        currentUser={currentUser}
        users={users}
        conversations={conversations}
        conversation={conversation}
        messages={messages}
      />
    </div>
    <MeetingsPanel />
    <HelperDesk />
  </>
);
