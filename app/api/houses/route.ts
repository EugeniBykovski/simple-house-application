import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const houses = await db.house.findMany({
      include: { entrances: true },
    });

    return NextResponse.json({ houses });
  } catch (error) {
    console.error("Error fetching houses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
