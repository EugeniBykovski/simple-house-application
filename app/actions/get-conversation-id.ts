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
        messages: {
          include: {
            sender: true,
            seenBy: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return null;
    }

    return {
      ...conversation,
      participants: conversation.participants.map((p) => p.user),
    };
  } catch (error) {
    return null;
  }
};

export default getConversationById;
