import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: {
        subscriptions: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!user || !user.subscriptions.length) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    const workspaceIds = user.subscriptions.map((sub) => sub.workspaceId);

    return NextResponse.json({ workspaceIds }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
