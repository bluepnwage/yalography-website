import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
  list,
  updateMetadata,
  StorageReference
} from "firebase/storage";
import type { Resources } from "@prisma/client";
// import { transformImage } from "@/lib/cloudinary";
import { app } from "./config";

const storage = getStorage(app);

export type Env = { environment: "production" | "dev" | "preview" };

type UploadOptions = {
  folderID?: number;
  projectID?: number;
} & Env;

const meta = {
  cacheControl: "max-age=31536000, immutable"
};

export async function uploadToDB(
  data: Omit<Resources, "id" | "published" | "projectId" | "folderId"> & { folderId?: number }
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

async function update(ref: StorageReference) {
  await updateMetadata(ref, meta);
}

export async function listImages() {
  const folder = ref(storage, "gallery-preview/");
  let token: string | undefined;
  do {
    const images = await list(folder, { maxResults: 10, pageToken: token });
    token = images.nextPageToken;
    const promise = images.items.map((image) => {
      return update(image);
    });
    await Promise.all(promise);
  } while (token);
  console.log("Updates successfull");
}
