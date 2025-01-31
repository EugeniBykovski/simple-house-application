import { db } from "@/lib/db";
import getSession from "./get-session";

const getUsers = async () => {
  try {
    const session = await getSession();
    if (!session?.user.email) {
      return [];
    }

    const userSubscription = await db.subscription.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        workspaceId: true,
      },
    });

    if (!userSubscription?.workspaceId) {
      return [];
    }

    const workspaceId = userSubscription.workspaceId;

    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        subscriptions: {
          some: {
            workspaceId: workspaceId,
          },
        },
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;
