import { cache } from "react";
import prisma from "@lib/prisma";
import { notFound } from "next/navigation";

export const findProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();
  if (!project) notFound();
  return project;
});
