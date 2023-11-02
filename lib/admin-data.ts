import { cache } from "react";
import prisma from "./prisma";
import { formatDate } from "@/util/formate-date";

export const getBookings = cache(async () => {
  const bookings = await prisma.bookings.findMany({
    where: { OR: [{ status: "approved" }, { status: "pending" }] }
  });
  return bookings.map(booking => ({ ...booking, date: formatDate(booking.date) }));
});

export const getTasks = cache(async () => {
  const tasks = await prisma.tasks.findMany({ where: { status: false } });
  return tasks.map(task => ({
    ...task,
    createdAt: formatDate(task.createdAt),
    updatedAt: formatDate(task.updatedAt),
    deadline: task.deadline ? formatDate(task.deadline) : ""
  }));
});

export const getProjects = cache(async () => {
  const projects = await prisma.projects.findMany();
  return projects.map(project => ({ ...project, createdAt: formatDate(project.createdAt) }));
});

export const getOrders = cache(async () => {
  const orders = await prisma.orders.findMany({ include: { booking: true } });
  return orders.map(order => ({
    ...order,
    createdAt: formatDate(order.createdAt),
    booking: { ...order.booking, date: formatDate(order.booking.date) }
  }));
});

export const getRescheduled = async () => {
  const bookings = await prisma.bookings.findMany({ where: { status: "rescheduled" } });
  return bookings.map(booking => ({ ...booking, date: formatDate(booking.date) }));
};
