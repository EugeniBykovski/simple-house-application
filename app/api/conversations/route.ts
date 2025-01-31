import getCurrentUser from "@/app/actions/get-current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          participants: {
            create: [
              ...members.map((member: { value: string }) => ({
                user: { connect: { id: member.value } },
              })),
              {
                user: { connect: { id: currentUser.id } },
              },
            ],
          },
        },
        include: {
          participants: {
            include: {
              user: true,
            },
          },
        },
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            participants: {
              every: {
                userId: {
                  in: [currentUser.id, userId],
                },
              },
            },
          },
          {
            participants: {
              every: {
                userId: {
                  in: [userId, currentUser.id],
                },
              },
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        isGroup: false,
        participants: {
          create: [
            { user: { connect: { id: currentUser.id } } },
            { user: { connect: { id: userId } } },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
