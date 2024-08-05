"use server";
import { errorActionReturn, successActionReturn } from "@/lib/hooks/action-return";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
type Props = {
  alt: string;
  height: number;
  width: number;
  name: string;
  url: string;
  type: string;
  size: number;
  publicId: string;
  projectId: number | undefined;
  folderId: number | undefined;
  resourceType: string;
}[];

export async function uploadImageAction(prevState: any, uploadedFiles: Props) {
  try {
    await prisma.resources.createMany({ data: uploadedFiles });
    revalidatePath("/admin/gallery");
    return successActionReturn("Media uploaded");
  } catch (error) {
    return errorActionReturn({ inputErrors: null, message: "Failed to upload media" });
  }
}
