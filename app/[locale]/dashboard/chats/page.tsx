import { FC } from "react";
import { DashboardHeader } from "@/components/header/DashboardHeader/DashboardHeader";
import Chats from "./components/chats";
import getCurrentUser from "@/app/actions/get-current-user";
import getUsers from "@/app/actions/get-users";
import getConversations from "@/app/actions/get-conversations";
import getConversationById from "@/app/actions/get-conversation-id";
import getMessages from "@/app/actions/get-messages";
import { FullConversationType, FullMessageType } from "@/types/chats";

const ChatsPage: FC = async () => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  const conversations: FullConversationType[] = await getConversations();

  const conversationId = conversations.length > 0 ? conversations[0].id : null;
  const conversation = conversationId
    ? await getConversationById(conversationId)
    : null;
  const messages: FullMessageType[] = conversationId
    ? await getMessages(conversationId)
    : [];

  return (
    <>
      <DashboardHeader>
        <div>AddTaskShortcut</div>
      </DashboardHeader>
      <main className="py-2 px-3 h-full mb-2">
        {currentUser && (
          <Chats
            currentUser={currentUser}
            users={users}
            conversations={conversations}
            conversation={conversation}
            messages={messages}
          />
        )}
      </main>
    </>
  );
};

export default ChatsPage;
