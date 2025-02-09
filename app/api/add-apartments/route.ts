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
    const { street, houseNumber, entranceNumber, apartmentNumber } =
      await req.json();

    if (!street || !houseNumber || !entranceNumber || !apartmentNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Adding apartment:", {
      street,
      houseNumber,
      entranceNumber,
      apartmentNumber,
    });

    let house = await db.house.findUnique({
      where: { street_houseNumber: { street, houseNumber } },
    });

    if (!house) {
      house = await db.house.create({
        data: { street, houseNumber, createdBy: session.user.id },
      });
    }

    let entrance = await db.entrance.findUnique({
      where: { houseId_entranceNumber: { houseId: house.id, entranceNumber } },
    });

    if (!entrance) {
      entrance = await db.entrance.create({
        data: { houseId: house.id, entranceNumber, createdBy: session.user.id },
      });
    }

    let apartment = await db.apartment.findUnique({
      where: {
        entranceId_apartmentNumber: {
          entranceId: entrance.id,
          apartmentNumber,
        },
      },
    });

    if (!apartment) {
      apartment = await db.apartment.create({
        data: {
          entranceId: entrance.id,
          apartmentNumber,
          createdBy: session.user.id,
        },
      });
    }

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
    }

    return NextResponse.json({ message: "Apartment added", apartment });
  } catch (error) {
    console.error("Error adding apartment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
