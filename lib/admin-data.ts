import { cache } from "react";
import prisma from "./prisma";
import { formatDate } from "@/util/formate-date";

export const getBookings = cache(async () => {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({
    where: { OR: [{ status: "approved" }, { status: "pending" }] }
  });
  await prisma.$disconnect();
  return bookings.map(booking => ({ ...booking, date: formatDate(booking.date) }));
});

export const getTasks = cache(async () => {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany({ where: { status: false } });
  await prisma.$disconnect();
  return tasks.map(task => ({
    ...task,
    createdAt: formatDate(task.createdAt),
    updatedAt: formatDate(task.updatedAt),
    deadline: task.deadline ? formatDate(task.deadline) : ""
  }));
});

export const getProjects = cache(async () => {
  await prisma.$connect();
  const projects = await prisma.projects.findMany();
  await prisma.$disconnect();
  return projects.map(project => ({ ...project, createdAt: formatDate(project.createdAt) }));
});

export const getOrders = cache(async () => {
  await prisma.$disconnect();
  const orders = await prisma.orders.findMany({ include: { booking: true } });
  await prisma.$disconnect();
  return orders.map(order => ({
    ...order,
    createdAt: formatDate(order.createdAt),
    booking: { ...order.booking, date: formatDate(order.booking.date) }
  }));
});
