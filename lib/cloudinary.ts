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

type CloudinaryAsset = {
  width: number;
  height: number;
  format: string;
  public_id: string;
};
