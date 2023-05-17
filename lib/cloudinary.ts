import cloudinary from "cloudinary";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.v2.config({
  cloud_name,
  api_key,
  api_secret
});

export async function deleteResource(ids: string[]) {
  await cloudinary.v2.api.delete_resources(ids);
}

export function transformImage(transform: string, public_id: string, format: string) {
  return `https://res.cloudinary.com/${cloud_name}/image/upload/c_scale,${transform}/${public_id}.${format}`;
}

type Response = {
  resources: CloudinaryAsset[];
  total_count: number;
};

type CloudinaryAsset = {
  width: number;
  height: number;
  format: string;
  public_id: string;
};
