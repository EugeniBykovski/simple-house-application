import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { workspaceId: string | string[] } }
) {
  const workspaceId = Array.isArray(params.workspaceId)
    ? params.workspaceId.join("/")
    : params.workspaceId;

  try {
    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        subscribers: {
          include: { user: true },
        },
        Creator: true,
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const house = await db.house.findFirst({
      where: {
        entrances: {
          some: {
            apartments: {
              some: {
                User: {
                  some: {
                    id: { in: workspace.subscribers.map((s) => s.userId) },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        entrances: {
          include: {
            apartments: {
              include: { User: true },
            },
          },
        },
      },
    });

    if (!house) {
      return NextResponse.json(
        { error: "House not found for the given workspace" },
        { status: 404 }
      );
    }

    return NextResponse.json({ workspace, house });
  } catch (error) {
    console.error("Error fetching workspace users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
