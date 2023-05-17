import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";
import { uploadToDB } from "./firebase/storage";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
export const endpoint = `https://api.cloudinary.com/v1_1/db5isi6l1/image/upload`;

const cloudinary = new Cloudinary({
  cloud: {
    cloudName
  }
});
export async function uploadToCloudinary(image: Blob) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "uvsalod6");
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
      fullPath: json.public_id
    });
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
