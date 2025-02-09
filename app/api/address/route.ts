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

    console.log("Received address data:", {
      street,
      houseNumber,
      entranceNumber,
      floor,
      apartmentNumber,
      contractCode,
    });

    let house = await db.house.findUnique({
      where: { street_houseNumber: { street, houseNumber } },
    });

    if (!house) {
      house = await db.house.create({
        data: { street, houseNumber },
      });
    }

    console.log("House found/created:", house);

    let entrance = await db.entrance.findUnique({
      where: { houseId_entranceNumber: { houseId: house.id, entranceNumber } },
    });

    if (!entrance) {
      entrance = await db.entrance.create({
        data: { houseId: house.id, entranceNumber },
      });
    }

    console.log("Entrance found/created:", entrance);

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
          floor: floor ?? "1",
        },
      });
    } else if (apartment.floor !== floor) {
      apartment = await db.apartment.update({
        where: { id: apartment.id },
        data: { floor: floor ?? "1" },
      });
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        apartmentId: apartment.id,
        contractCode: contractCode ?? null,
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
