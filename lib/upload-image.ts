import type { Resources } from "@prisma/client";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
export const imgEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
const videoEnpoint = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

// export async function uploadToDB(
//   data: Omit<Resources, "id" | "published" | "projectId" | "folderId"> & {
//     folderId?: number;
//     projectId?: number;
//   }
// ) {
//   const res = await fetch("/api/images", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) {
//     throw new Error("Failed to upload to database");
//   }
// }

type UploadOptions = { folderId?: number; projectId?: number };

export async function uploadToCloudinary(image: Blob, options?: UploadOptions) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", presetName);
  const res = await fetch(image.type.includes("video") ? videoEnpoint : imgEndpoint, {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    const json = (await res.json()) as CloudinaryResponse;

    return {
      success: true,
      data: json as CloudinaryResponse,
      options
    } as const;
  } else {
    return {
      success: false,
      data: null,
      options
    } as const;
  }
}

export async function uploadThumbnail(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", presetName);
  const res = await fetch(imgEndpoint, {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    const json = (await res.json()) as CloudinaryResponse;

    return json;
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
