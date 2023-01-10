import { ImageFolders, PrismaClient, Projects, TaskLists } from "@prisma/client";
import type { Bookings, Tasks, Orders } from "@prisma/client";

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
export type SerializedTaskList = Omit<TaskLists, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
export type SerializedProject = Omit<Projects, "createdAt"> & { createdAt: string };
