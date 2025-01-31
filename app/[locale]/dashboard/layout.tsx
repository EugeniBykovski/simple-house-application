import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import { CommonTools } from "./common/CommonTools";
import { MeetingsProvider } from "@/context/MeetingsContext";
import getCurrentUser from "@/app/actions/get-current-user";
import getUsers from "@/app/actions/get-users";
import getConversations from "@/app/actions/get-conversations";
import { Conversation, Message, User } from "@prisma/client";
import getConversationById from "@/app/actions/get-conversation-id";
import getMessages from "@/app/actions/get-messages";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    body?: string;
    image?: string;
    createdAt?: string;
    seen?: { email: string }[];
  }[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  conversationId: string;
}

const DashboardLayout = async ({
  children,
  conversationId,
}: DashboardLayoutProps) => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  const conversations: ExtendedConversation[] = await getConversations();

  const conversation = await getConversationById(conversationId);
  const messages: Message[] = await getMessages(conversationId);

  return (
    <ToggleSidebarProvider>
      <MeetingsProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="flex flex-1 w-full flex-col h-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
              {children}
            </div>
            {currentUser && users && conversations && (
              <CommonTools
                currentUser={currentUser}
                users={users}
                conversations={conversations}
                conversation={conversation}
                messages={messages}
              />
            )}
          </div>
        </div>
      </MeetingsProvider>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
