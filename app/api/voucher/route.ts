import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        voucher: true,
        voucherCode: randomCode,
      },
    });

    if (!user) {
      throw new Error("Failed to update voucher");
    }

    return NextResponse.json({ success: true, voucherCode: randomCode });
  } catch (error) {
    console.error("Error updating voucher:", error);
    return NextResponse.json(
      { error: "Failed to update voucher" },
      { status: 500 }
    );
  }
}
