import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "db5isi6l1",
  api_key: "776693593772495",
  api_secret: "mikzbqDrhk7I8D1h7wmHCZQbpv0"
});

export async function listImages() {
  const results = (await cloudinary.v2.search.expression(`folder:yalo-preview/*`).execute()) as Response;
  console.log(results);
  return results.resources;
}

export function transform(transform: string, public_id: string, format: string) {
  return `https://res.cloudinary.com/db5isi6l1/image/upload/c_scale,${transform}/${public_id}.${format}`;
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
