const { PrismaClient } = require("@prisma/client");
const bookingsData = require("./mock-data.js");
const taskData = require("./tasks-mock-data.js");
const prisma = new PrismaClient();

async function createBookings() {
  await prisma.$connect();
  await prisma.bookings.deleteMany();
  /**@type {import('@prisma/client').Bookings} */
  const data = bookingsData.map(({ id, ...data }) => {
    return {
      ...data,
      date: new Date(data.date),
      description: data.description || ""
    };
  });
  await prisma.bookings.createMany({ data });
  await prisma.$disconnect();
}

async function createTasks() {
  await prisma.$connect();
  await prisma.tasks.deleteMany();
  /**@type {import('@prisma/client').Tasks[]} */
  const data = taskData.map(({ id, ...data }) => {
    return {
      ...data,
      deadline: data?.deadline ? new Date(data.deadline) : null
    };
  });
  await prisma.tasks.createMany({ data });
  await prisma.$disconnect();
}
createTasks().then(() => console.log("Tasks created"));
createBookings().then(() => console.log("Bookings created"));
