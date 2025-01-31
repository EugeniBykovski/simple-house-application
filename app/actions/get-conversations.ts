import getCurrentUser from "./get-current-user";
import { db } from "@/lib/db";
import { Conversation, User } from "@prisma/client";

interface ExtendedConversation extends Conversation {
  participants: User[];
  messages: {
    id: string;
    body?: string;
    image?: string;
    createdAt?: string;
    sender: User;
    seen?: { email: string }[];
  }[];
}

const getConversations = async (): Promise<ExtendedConversation[]> => {
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
        body: message.body ?? undefined,
        image: message.image ?? undefined,
        createdAt: message.createdAt
          ? message.createdAt.toISOString()
          : undefined,
        sender: message.sender,
        seen: message.seenBy.map((seen) => ({
          email: seen.user.email ?? "",
        })),
      })),
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export default getConversations;
