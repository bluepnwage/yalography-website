import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
export const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const cloudinary = new Cloudinary({
  cloud: {
    cloudName
  }
});
async function uploadToCloudinary(image: Blob): Promise<CloudinaryResponse> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", presetName);
  const res = await fetch(endpoint, {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    throw new Error("Failed to transform image");
  }
}

export async function transformImage(file: File) {
  const image = await uploadToCloudinary(file);
  const cloudImage = cloudinary.image(image.public_id);
  cloudImage.resize(Resize.scale().width(2000));
  const newImage = await fetch(cloudImage.toURL());
  return newImage.blob();
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
