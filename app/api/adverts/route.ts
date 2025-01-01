import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  try {
    const messages = await prisma.advertMessage.findMany({
      include: {
        user: { select: { username: true } },
      },
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      messages.map((msg) => ({
        content: msg.content,
        username: msg.user.username,
        phone: msg.phone,
      }))
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, phone } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (phone && typeof phone !== "string") {
      return NextResponse.json(
        { error: "Phone must be a string" },
        { status: 400 }
      );
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const newMessage = await prisma.advertMessage.create({
      data: {
        userId: session.user.id,
        content: message,
        phone: phone || null,
        expiresAt: expiresAt,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
