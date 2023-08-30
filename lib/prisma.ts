import { PrismaClient } from "@prisma/client";
import type { Bookings, Tasks, Orders, SubTasks, ImageFolders, Projects } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

export type SerializedBooking = Omit<Bookings, "date"> & { date: string };
export type SerializedTask = Omit<Tasks, "deadline" | "createdAt" | "updatedAt"> & {
  deadline: string;
  createdAt: string;
  updatedAt: string;
};
export type SerializedOrder = Omit<Orders, "createdAt"> & { createdAt: string };
export type SerializedImageFolder = Omit<ImageFolders, "createdAt"> & { createdAt: string };
export type SerializedProject = Omit<Projects, "createdAt"> & { createdAt: string };
export type SerializedSubTask = Omit<SubTasks, "createdAt"> & { createdAt: string };
