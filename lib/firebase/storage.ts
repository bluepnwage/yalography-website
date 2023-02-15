import { getStorage, uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";
import type { UploadResult } from "firebase/storage";
import type { Images } from "@prisma/client";

import { app } from "./config";

const storage = getStorage(app);

export type Env = { environment: "prod" | "dev" };

type UploadOptions = {
  folderID?: number;
  projectID?: number;
} & Env;

export async function uploadImage(file: File, options: UploadOptions) {
  const fileName = crypto.randomUUID();
  const imageRef = ref(storage, `gallery-${options.environment}/${fileName}`);
  const image = await uploadBytes(imageRef, file);

  readFile(file, image, fileName, options?.folderID, options?.projectID);
}

//function to get the width and height of an image then upload to db
function readFile(file: File, upload: UploadResult, fileName: string, folderID?: number, projectID?: number) {
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
      name: fileName,
      type: file.type,
      size: file.size,
      fullPath: upload.metadata.fullPath,
      folderId: folderID,
      projectId: projectID
    };
    await uploadToDB(imageData);
  };
  fileReader.readAsDataURL(file);
}

async function uploadToDB(
  data: Omit<Images, "id" | "published" | "projectId" | "folderId"> & { folderId?: number }
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

export async function deleteImage(fullPath: string) {
  const imageRef = ref(storage, fullPath);
  await deleteObject(imageRef);
}

export async function uploadThumbnail(file: File, projectName: string, environment: Env["environment"]) {
  const imageRef = ref(storage, `thumbnails-${environment}/${projectName}-thumbnail`);
  const upload = await uploadBytes(imageRef, file);
  const url = getDownloadURL(upload.ref);
  return url;
}

export async function deleteThumbnail(projectName: string, environment: Env["environment"]) {
  try {
    const imageRef = ref(storage, `thumbnail-${environment}/${projectName}-thumbnail`);
    await deleteObject(imageRef);
  } catch (error) {
    if (error instanceof Error) {
      const res = await fetch("/api/error-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Upload image",
          status: 500,
          stackTrace: error.stack,
          description: error.message
        })
      });
      if (res.ok) {
        throw new Error(
          "There was en error when trying to delete your project. The team has already been notified and will find a fix as soon as possible.",
          { cause: error }
        );
      }
    }
  }
}
