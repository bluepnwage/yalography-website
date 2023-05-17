import type { Images } from "@prisma/client";
import { transformImage } from "./transform-image";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
export const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export async function uploadToDB(
  data: Omit<Images, "id" | "published" | "projectId" | "folderId"> & {
    folderId?: number;
    projectId?: number;
  }
) {
  const res = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error("Failed to upload to database");
  }
}

type UploadOptions = { folderId?: number; projectId?: number };

export async function uploadToCloudinary(image: Blob, options?: UploadOptions) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", presetName);
  const res = await fetch(endpoint, {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    const json = (await res.json()) as CloudinaryResponse;

    await uploadToDB({
      alt: "",
      height: json.height,
      width: json.width,
      name: crypto.randomUUID(),
      url: json.url,
      type: json.type,
      size: json.bytes,
      publicId: json.public_id,
      projectId: options?.projectId,
      folderId: options?.folderId
    });
  } else {
    throw new Error("Failed to transform image");
  }
}

export async function uploadThumbnail(image: File, option?: UploadOptions) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", presetName);
  const res = await fetch(endpoint, {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    const json = (await res.json()) as CloudinaryResponse;

    return transformImage("w_900", json.public_id, json.type);
  } else {
    throw new Error("Failed to transform image");
  }
}

type CloudinaryResponse = {
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
};
