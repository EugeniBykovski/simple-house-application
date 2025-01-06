import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, status, amount } = await req.json();

    if (!userId || !status || !amount) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    const newCheck = await prisma.check.create({
      data: {
        userId,
        status,
        amount,
      },
    });

    return new Response(JSON.stringify(newCheck), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create check" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const checks = await prisma.check.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(checks), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch checks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch checks" }), {
      status: 500,
    });
  }
}
