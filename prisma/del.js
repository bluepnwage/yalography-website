const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteEver = async () => {
  await prisma.$connect();
  await Promise.all([
    prisma.bookings.deleteMany(),
    prisma.orders.deleteMany(),
    prisma.taskLists.deleteMany(),
    prisma.tasks.deleteMany(),
    prisma.imageFolders.deleteMany(),
    prisma.images.deleteMany()
  ]);
  await prisma.$disconnect();
};

deleteEver().then(() => console.log("Everything deleted"));
