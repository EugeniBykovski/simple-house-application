import { db } from "@/lib/db";
import getCurrentUser from "./get-current-user";
import { FullConversationType } from "@/types/chats";

const getConversationById = async (
  conversationId: string
): Promise<FullConversationType | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) return null;

    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          include: { user: true },
        },
        messages: {
          include: {
            sender: true,
            seenBy: { include: { user: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) return null;

    return {
      ...conversation,
      participants: conversation.participants.map((p) => p.user),
      messages: conversation.messages.map((message) => ({
        ...message,
        senderId: message.senderId,
        conversationId: message.conversationId,
        seen: message.seenBy.map((seen) => seen.user),
      })),
    };
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }
};

export default getConversationById;
