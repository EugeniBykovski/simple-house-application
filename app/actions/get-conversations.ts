import getCurrentUser from "./get-current-user";
import { db } from "@/lib/db";
import { FullConversationType } from "@/types/chats";
import { Conversation, User, Message } from "@prisma/client";

const getConversations = async (): Promise<FullConversationType[]> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return [];
    }

    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        participants: {
          some: {
            userId: currentUser.id,
          },
        },
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

    return conversations.map((conversation) => ({
      ...conversation,
      participants: conversation.participants.map((p) => p.user),
      messages: conversation.messages.map((message) => ({
        id: message.id,
        body: message.body ?? null,
        image: message.image ?? null,
        createdAt: message.createdAt,
        conversationId: message.conversationId,
        senderId: message.senderId,
        sender: message.sender,
        seen: message.seenBy.map((seen) => seen.user),
      })),
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export default getConversations;
