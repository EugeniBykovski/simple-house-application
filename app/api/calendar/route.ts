import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const events = await prisma.calendarEvent.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, date, time, apartmentId } = await req.json();
  if (!title || !description || !date || !time) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const event = await prisma.calendarEvent.create({
      data: {
        title,
        description,
        date: new Date(`${date}T${time}:00`),
        userId: session.user.id,
        apartmentId: apartmentId || null,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
