import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.coursera.create({
    data: {
      name: "python",
      type: "learn",
      url: "https://thoughtful-wont.info/learn/python",
      score: 4.5,
    },
  });
  await prisma.coursera.create({
    data: {
      name: "leadership",
      type: "learn",
      url: "https://thoughtful-wont.info/learn/leadership",
      score: 4.0,
    },
  });
  await prisma.coursera.create({
    data: {
      name: "nonsense",
      type: "learn",
      url: "https://thoughtful-wont.info/learn/nonsense",
      score: 2.5,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
