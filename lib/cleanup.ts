import { prisma } from "@/lib/prisma";

export async function cleanupExpiredMessages() {
  const now = new Date();

  try {
    const result = await prisma.advertMessage.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });

    console.log(`${result.count} expired messages deleted.`);
  } catch (error) {
    console.error("Failed to clean up expired messages:", error);
  }
}
