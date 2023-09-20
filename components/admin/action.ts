"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Tasks } from "@prisma/client";
import { redirect } from "next/navigation";

export async function revalidateGallery() {
  revalidatePath("/gallery");
}

export async function createTask(form: FormData, deadline: Date | null) {
  const taskName = form.get("task_name")?.toString();
  const priority = form.get("priority")?.toString() as Tasks["priority"];
  if (!taskName) return { error: true, message: "Must provide a name" };
  const data = {
    name: taskName,
    description: taskName,
    deadline,
    priority: priority || "low"
  };

  await prisma.tasks.create({ data });

  revalidatePath("/admin/tasks");
  return { error: false, message: "Task created" };
}

export async function createBooking(formData: FormData, date: Date, features: string) {
  const form = Object.fromEntries(formData);
  const data = {
    firstName: form.first_name.toString(),
    lastName: form.last_name.toString(),
    email: form.email.toString(),
    phone: form.phone.toString(),
    time: form.time.toString(),
    description: form?.description.toString()! || null,
    date: date!,
    type: form.shoot_type.toString(),
    environment: form.environment.toString() === "inside",
    features
  };
  const booking = await prisma.bookings.create({ data });

  redirect(`/admin/bookings/${booking.id}`);
}

export async function createProject(formData: FormData) {
  const form = Object.fromEntries(formData);
  if (!form.project_name.toString()) return { error: true, message: "Must provide a name" };
  console.log(form);

  const data = { name: form.project_name.toString() };
  const project = await prisma.projects.create({ data });

  redirect(`/admin/projects/${project.id}`);
}
