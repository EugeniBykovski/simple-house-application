import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { onboardingSchema } from "@/schema/onboardingSchema";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const user = await db.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingHouse = await db.house.findUnique({
      where: {
        street_houseNumber: {
          street: address.street,
          houseNumber: address.houseNumber,
        },
      },
      include: {
        entrances: {
          where: { entranceNumber: address.entranceNumber },
          include: {
            apartments: {
              include: { users: true },
            },
          },
        },
      },
    });

    let workspace;

    if (!existingHouse) {
      const house = await db.house.create({
        data: {
          street: address.street,
          houseNumber: address.houseNumber,
        },
      });

      const entrance = await db.entrance.create({
        data: {
          houseId: house.id,
          entranceNumber: address.entranceNumber,
        },
      });

      const apartment = await db.apartment.create({
        data: {
          entranceId: entrance.id,
          apartmentNumber: address.apartmentNumber,
        },
      });

      workspace = await db.workspace.create({
        data: {
          creatorId: user.id,
          name: workspaceName,
          image: workspaceImage,
        },
      });

      await db.subscription.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          userRole: "ADMIN",
        },
      });

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
    } else {
      const entrance = existingHouse.entrances.find(
        (entr) => entr.entranceNumber === address.entranceNumber
      );

      if (!entrance) {
        return NextResponse.json(
          { error: "Entrance not found" },
          { status: 400 }
        );
      }

      const apartment = await db.apartment.upsert({
        where: {
          entranceId_apartmentNumber: {
            entranceId: entrance.id,
            apartmentNumber: address.apartmentNumber,
          },
        },
        update: { floor: address.floor },
        create: {
          entranceId: entrance.id,
          apartmentNumber: address.apartmentNumber,
          floor: address.floor,
        },
      });

      const firstUser = entrance.apartments[0]?.users[0];

      if (!firstUser) {
        workspace = await db.workspace.create({
          data: {
            creatorId: user.id,
            name: workspaceName,
            image: workspaceImage,
          },
        });

        await db.subscription.create({
          data: {
            userId: user.id,
            workspaceId: workspace.id,
            userRole: "ADMIN",
          },
        });
      } else {
        workspace = await db.workspace.findFirst({
          where: {
            creatorId: firstUser.id,
          },
        });

        if (!workspace) {
          workspace = await db.workspace.create({
            data: {
              creatorId: firstUser.id,
              name: workspaceName,
              image: workspaceImage,
            },
          });
        }

        await db.subscription.upsert({
          where: {
            userId_workspaceId: {
              userId: user.id,
              workspaceId: workspace.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            workspaceId: workspace.id,
            userRole: "READ_ONLY",
          },
        });
      }

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
    }

    return NextResponse.json({
      message: "Onboarding complete",
      workspaceId: workspace.id,
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
