import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apartmentId = searchParams.get("apartmentId");

  if (!apartmentId) {
    return NextResponse.json({ error: "Missing apartmentId" }, { status: 400 });
  }

  try {
    const ads = await db.advertMessage.findMany({
      where: { user: { apartmentId } },
    });

    return NextResponse.json({ ads });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
