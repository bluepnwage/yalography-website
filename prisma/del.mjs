import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.$connect();
await Promise.all([
  // prisma.bookings.deleteMany(),
  // prisma.orders.deleteMany(),
  // prisma.taskLists.deleteMany(),
  // prisma.tasks.deleteMany(),
  // prisma.imageFolders.deleteMany(),
  prisma.images.deleteMany()
]);
await prisma.$disconnect();
