import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apartmentId = searchParams.get("apartmentId");

  if (!apartmentId) {
    return NextResponse.json({ error: "Missing apartmentId" }, { status: 400 });
  }

  try {
    const messages = await db.message.findMany({
      where: {
        conversation: {
          participants: {
            some: { user: { apartmentId } },
          },
        },
      },
      include: { sender: true },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
