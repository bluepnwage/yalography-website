import { getStorage, uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";

import type { UploadResult } from "firebase/storage";
import type { Images } from "@prisma/client";

import { app } from "./config";

const storage = getStorage(app);

export async function uploadImage(file: File, folderID?: number) {
  const imageRef = ref(storage, `gallery/${file.name}`);
  const image = await uploadBytes(imageRef, file);

  readFile(file, image, folderID);
}

function readFile(file: File, upload: UploadResult, folderID?: number) {
  const fileReader = new FileReader();

  fileReader.onloadend = async () => {
    const image = new Image();
    image.src = fileReader.result as string;
    const imageURL = await getDownloadURL(upload.ref);
    const imageData = {
      width: image.width,
      height: image.height,
      alt: "",
      url: imageURL,
      name: file.name,
      type: file.type,
      size: file.size,
      fullPath: upload.metadata.fullPath,
      folderId: folderID
    };
    await uploadToDB(imageData);
  };
  fileReader.readAsDataURL(file);
}

async function uploadToDB(data: Omit<Images, "id" | "published" | "projectId" | "folderId"> & { folderId?: number }) {
  const res = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error("Failed to upload to database");
  }
}

export async function deleteImage(fullPath: string) {
  const imageRef = ref(storage, fullPath);
  await deleteObject(imageRef);
}
