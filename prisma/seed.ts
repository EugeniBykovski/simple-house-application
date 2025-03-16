import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("hashedpassword123", 10);

  await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      hashedPassword,
    },
  });

  console.log("✅ Database seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
