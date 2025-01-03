import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { onboardingSchema } from "@/schema/onboardingSchema";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized User",
    });
  }

  const body = await request.json();
  const result = onboardingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.errors },
      { status: 400 }
    );
  }

  const { address, workspaceName, name, surname, workspaceImage } = result.data;

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Handle address creation
    const house = await db.house.upsert({
      where: {
        street_houseNumber: {
          street: address.street,
          houseNumber: address.houseNumber,
        },
      },
      update: {},
      create: { street: address.street, houseNumber: address.houseNumber },
    });

    const entrance = await db.entrance.upsert({
      where: {
        houseId_entranceNumber: {
          houseId: house.id,
          entranceNumber: address.entranceNumber,
        },
      },
      update: {},
      create: { houseId: house.id, entranceNumber: address.entranceNumber },
    });

    const apartment = await db.apartment.upsert({
      where: {
        entranceId_apartmentNumber: {
          entranceId: entrance.id,
          apartmentNumber: address.apartmentNumber,
        },
      },
      update: {},
      create: {
        entranceId: entrance.id,
        apartmentNumber: address.apartmentNumber,
      },
    });

    // Update user data
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        surname,
        completedOnboarding: true,
        apartmentId: apartment.id,
        contractCode: address.contractCode,
      },
    });

    // Create workspace
    const workspace = await db.workspace.create({
      data: {
        creatorId: user.id,
        name: workspaceName,
        image: workspaceImage,
      },
    });

    // Create subscription for the workspace
    await db.subscription.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        userRole: "OWNER",
      },
    });

    // Create default Pomodoro settings for the user
    await db.pomodoroSettings.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Onboarding complete" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
}
