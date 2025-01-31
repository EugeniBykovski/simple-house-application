import { db } from "@/lib/db";
import { Message, User } from "@prisma/client";

interface ExtendedMessage extends Message {
  sender: User;
  seenBy: { email: string }[];
}

const getMessages = async (
  conversationId: string
): Promise<ExtendedMessage[]> => {
  try {
    const messages = await db.message.findMany({
      where: { conversationId },
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
    });

    return messages.map((message) => ({
      ...message,
      seenBy: message.seenBy.map((seen) => ({
        email: seen.user.email ?? "",
      })),
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export default getMessages;
