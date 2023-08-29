import prisma from "@/lib/prisma";
import { serverError } from "@/util/serverError";
import { logError } from "@/lib/notion";
import { handlePromise } from "@/util/handle-promise";
import { deleteResource } from "@/lib/cloudinary";

import type { Images } from "@prisma/client";
import type { NextApiHandler } from "next";

async function createImage(data: Images) {
  await prisma.$connect();
  const image = await prisma.images.create({ data });
  await prisma.$disconnect();
  return image;
}

async function editImage(data: Partial<Images>) {
  await prisma.$connect();
  const image = await prisma.images.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return image;
}

async function deleteImage(id: number, publicId: string) {
  await prisma.$connect();
  const image = await prisma.images.delete({ where: { id } });
  await deleteResource([publicId]);
  await prisma.$disconnect();
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
          }) as Promise<Images>[];
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
