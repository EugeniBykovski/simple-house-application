import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const entrances = await db.entrance.findMany({
      include: { house: true, apartments: true },
    });

    return NextResponse.json({ entrances });
  } catch (error) {
    console.error("Error fetching entrances:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
