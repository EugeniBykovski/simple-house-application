import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userApartments = await db.userApartment.findMany({
      where: { userId: session.user.id },
      include: {
        apartment: {
          include: {
            entrance: { include: { house: true } },
          },
        },
      },
    });

    if (!userApartments || userApartments.length === 0) {
      return NextResponse.json({ apartments: [] });
    }

    const apartments = userApartments.map((ua) => ua.apartment);
    return NextResponse.json({ apartments });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
