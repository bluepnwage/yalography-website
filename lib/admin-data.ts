import { cache } from "react";
import prisma from "./prisma";

export const getBookings = cache(async () => {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({
    where: { OR: [{ status: "approved" }, { status: "pending" }] }
  });
  await prisma.$disconnect();
  return bookings.map(booking => ({ ...booking, date: booking.date.toString() }));
});

export const getTasks = cache(async () => {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany({ where: { status: false } });
  await prisma.$disconnect();
  return tasks.map(task => ({
    ...task,
    createdAt: task.createdAt.toString(),
    updatedAt: task.updatedAt.toString(),
    deadline: task.deadline?.toString() || ""
  }));
});

export const getProjects = cache(async () => {
  await prisma.$connect();
  const projects = await prisma.projects.findMany();
  await prisma.$disconnect();
  return projects.map(project => ({ ...project, createdAt: project.createdAt.toString() }));
});

export const getOrders = cache(async () => {
  await prisma.$disconnect();
  const orders = await prisma.orders.findMany({ include: { booking: true } });
  await prisma.$disconnect();
  return orders.map(order => ({
    ...order,
    createdAt: order.createdAt.toString(),
    booking: { ...order.booking, date: order.booking.date.toString() }
  }));
});
