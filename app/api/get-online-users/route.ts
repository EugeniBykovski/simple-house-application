import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const onlineUsers = await prisma.user.findMany({
      select: { id: true, username: true, image: true, isOnline: true },
    });

    return NextResponse.json({ onlineUsers });
  } catch (error) {
    console.error("Failed to fetch online users:", error);
    return NextResponse.json(
      { error: "Failed to fetch online users" },
      { status: 500 }
    );
  }
}
