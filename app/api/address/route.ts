import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      street,
      houseNumber,
      entranceNumber,
      floor,
      apartmentNumber,
      contractCode,
    } = await req.json();

    const house = await db.house.upsert({
      where: { street_houseNumber: { street, houseNumber } },
      update: {},
      create: { street, houseNumber },
    });

    const entrance = await db.entrance.upsert({
      where: { houseId_entranceNumber: { houseId: house.id, entranceNumber } },
      update: {},
      create: { houseId: house.id, entranceNumber },
    });

    const apartment = await db.apartment.upsert({
      where: {
        entranceId_apartmentNumber: {
          entranceId: entrance.id,
          apartmentNumber,
        },
      },
      update: { floor: floor ?? 1 },
      create: { entranceId: entrance.id, apartmentNumber, floor: floor ?? 1 },
    });

    await db.user.update({
      where: { id: session.user.id },
      data: {
        apartmentId: apartment.id,
        contractCode,
      },
    });

    return NextResponse.json({ message: "Address successfully saved" });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
