import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        apartment: {
          include: {
            entrance: { include: { house: true } },
          },
        },
        userApartments: {
          include: {
            apartment: {
              include: {
                entrance: { include: { house: true } },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ apartments: [], primaryApartment: null });
    }

    const primaryApartment = user.apartment;
    const apartments = user.userApartments.map((ua) => ua.apartment);

    return NextResponse.json({ primaryApartment, apartments });
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
