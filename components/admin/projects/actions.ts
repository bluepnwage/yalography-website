"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function publishProject(id: number, status: boolean) {
  const project = await prisma.projects.update({ where: { id }, data: { published: status } });

  revalidatePath("/projects");
}
