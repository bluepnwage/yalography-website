import { PrismaClient } from "@prisma/client";
import type { Bookings, Tasks } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

export type SerializedBooking = Omit<Bookings, "date"> & { date: string };
export type SerializedTask = Omit<Tasks, "daedline" | "createdAt" | "updatedAt"> & {
  deadline: string;
  createdAt: string;
  updatedAt: string;
};
