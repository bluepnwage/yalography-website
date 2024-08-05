import prisma from "@/lib/prisma";
import { serverError } from "@/util/serverError";
import { logError } from "@/lib/notion";
import { handlePromise } from "@/util/handle-promise";
import { deleteResource } from "@/lib/cloudinary";

import type { Resources } from "@prisma/client";
import type { NextApiHandler } from "next";

async function createImage(data: Resources) {
  const image = await prisma.resources.create({ data });

  return image;
}

async function editImage(data: Partial<Resources>) {
  const image = await prisma.resources.update({ where: { id: data.id }, data });

  return image;
}

async function deleteImage(id: number, publicId: string) {
  const image = await prisma.resources.delete({ where: { id } });
  await deleteResource([publicId]);

  return image;
}
const apiURL = "/api/images";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const promise = createImage(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create image",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating an image.");
        }
        return res.status(201).json({ message: "Image created", data });
      }
      case "PUT": {
        const query = parseInt(req.query.multiple as string);
        if (query) {
          const promises = json.ids.map((id: number) => {
            return editImage({ id, projectId: json.projectId });
          }) as Promise<Resources>[];
          const data = await Promise.all(promises);
          return res.status(200).json({ message: "Images updated", data });
        }
        const promise = editImage(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Edit image",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error editing an image.");
        }
        return res.status(200).json({ message: "Image updated", data });
      }
      case "DELETE": {
        const promise = deleteImage(json.id, json.publicId);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Delete image",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error deleting an image.");
        }
        return res.status(200).json({ message: "Image deleted", data });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      const e = error as any;
      await logError({
        title: "Server error",
        apiURL,
        description: e.message,
        stackTrace: e.stack,
        statusCode: 500
      });
      res.status(500).json({ message: serverError });
    }
  }
};

export default handler;
