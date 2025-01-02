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

export async function GET() {
  try {
    const checks = await prisma.check.findMany({
      include: {
        user: { select: { username: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(checks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch checks" }), {
      status: 500,
    });
  }
}
