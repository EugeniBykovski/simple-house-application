import { db } from "@/lib/db";
import { FullMessageType } from "@/types/chats";

const getMessages = async (
  conversationId: string
): Promise<FullMessageType[]> => {
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
      senderId: message.senderId,
      conversationId: message.conversationId,
      seen: message.seenBy.map((seen) => seen.user),
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export default getMessages;
