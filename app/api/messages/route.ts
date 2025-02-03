import getCurrentUser from "@/app/actions/get-current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const messages = await db.message.findMany({
      where: { conversationId: params.conversationId },
      include: {
        sender: true,
        seenBy: { include: { user: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message || "",
        image: image || null,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
      },
      include: { sender: true },
    });

    await db.messageSeenBy.create({
      data: {
        messageId: newMessage.id,
        userId: currentUser.id,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: {
        participants: true,
        messages: { include: { sender: true, seenBy: true } },
      },
    });

    return NextResponse.json(updatedConversation);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
