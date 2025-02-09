import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    console.error("Unauthorized request to /api/add-apartment");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { street, houseNumber, entranceNumber, apartmentNumber, floor } =
      await req.json();

    if (
      !street ||
      !houseNumber ||
      !entranceNumber ||
      !apartmentNumber ||
      !floor
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const house = await db.house.upsert({
      where: { street_houseNumber: { street, houseNumber } },
      update: {},
      create: {
        street,
        houseNumber,
        createdBy: session.user.id,
      },
    });

    const entrance = await db.entrance.upsert({
      where: { houseId_entranceNumber: { houseId: house.id, entranceNumber } },
      update: {},
      create: {
        houseId: house.id,
        entranceNumber,
        createdBy: session.user.id,
      },
    });

    const apartment = await db.apartment.upsert({
      where: {
        entranceId_apartmentNumber: {
          entranceId: entrance.id,
          apartmentNumber,
        },
      },
      update: {},
      create: {
        entranceId: entrance.id,
        apartmentNumber,
        floor,
        createdBy: session.user.id,
      },
    });

    const existingUserApartment = await db.userApartment.findUnique({
      where: {
        userId_apartmentId: {
          userId: session.user.id,
          apartmentId: apartment.id,
        },
      },
    });

    if (!existingUserApartment) {
      await db.userApartment.create({
        data: { userId: session.user.id, apartmentId: apartment.id },
      });
    } else {
      console.log("✅ User already linked to this apartment.");
    }

    return NextResponse.json({ message: "Apartment added", apartment });
  } catch (error) {
    console.error("❌ Error adding apartment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
