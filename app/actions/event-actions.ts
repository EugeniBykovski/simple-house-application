"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createEvent(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const session = await getAuthSession();
  if (!session) return { error: "User is not authenticated" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const apartmentId = formData.get("apartmentId") as string | null;

  if (!title || !description || !date || !time) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.calendarEvent.create({
      data: {
        title,
        description,
        date: new Date(`${date}T${time}:00`),
        userId: session.user.id,
        apartmentId: apartmentId || null,
      },
    });

    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create event" };
  }
}

export async function getEvents() {
  const session = await getAuthSession();
  if (!session) return [];

  return await prisma.calendarEvent.findMany({
    where: { userId: session.user.id },
    include: { user: true, apartment: true },
  });
}

export async function getAllUsersWorkspaceEvents() {
  try {
    const session = await getAuthSession();
    if (!session) return [];

    const workspaceId = await prisma.subscription.findFirst({
      where: { userId: session.user.id },
      select: { workspaceId: true },
    });

    if (!workspaceId) return [];

    const users = await prisma.user.findMany({
      where: {
        subscriptions: {
          some: {
            workspaceId: workspaceId.workspaceId,
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });

    console.log("Fetched users in workspace:", users);
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function deleteEvent(id: string) {
  const session = await getAuthSession();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.calendarEvent.delete({
      where: { id, userId: session.user.id },
    });

    revalidatePath("/calendar");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete event" };
  }
}
