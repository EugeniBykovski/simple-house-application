import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { apartmentId } = await req.json();

  console.log(`Switching to apartment ID: ${apartmentId}`);

  try {
    const userApartment = await db.userApartment.findUnique({
      where: { userId_apartmentId: { userId: session.user.id, apartmentId } },
      include: {
        apartment: {
          include: {
            entrance: { include: { house: true } },
          },
        },
      },
    });

    if (!userApartment) {
      console.log("Apartment not found or access denied.");
      return NextResponse.json(
        { error: "Apartment not found or access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Apartment switched",
      apartment: userApartment.apartment,
    });
  } catch (error) {
    console.error("Error switching apartment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
