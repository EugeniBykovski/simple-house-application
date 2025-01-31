import { db } from "@/lib/db";
import getCurrentUser from "./get-current-user";
import { Conversation, User } from "@prisma/client";

interface ExtendedConversation extends Conversation {
  participants: User[];
}

const getConversationById = async (
  conversationId: string
): Promise<ExtendedConversation | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!conversation) return null;

    return {
      ...conversation,
      participants: conversation.participants.map((p) => p.user),
    };
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
