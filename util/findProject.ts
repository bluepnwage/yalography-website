import { cache } from "react";
import prisma from "@lib/prisma";

export const findProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();

  return project;
});
