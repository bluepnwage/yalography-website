import prisma from "@lib/prisma";
import { handlePromise } from "@util/handle-promise";
import { serverError } from "@util/serverError";
import { logError } from "@lib/notion";

import type { ImageFolders } from "@prisma/client";
import type { NextApiHandler } from "next";

async function createFolder(data: ImageFolders) {
  await prisma.$connect();
  const folder = await prisma.imageFolders.create({ data });
  await prisma.$disconnect();
  return folder;
}

async function deleteFolder(id: number) {
  await prisma.$connect();
  const folder = await prisma.imageFolders.delete({ where: { id } });
  await prisma.$disconnect();
  return folder;
}

async function updateFolder(data: ImageFolders) {
  await prisma.$connect();
  const folder = await prisma.imageFolders.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return folder;
}

const apiURL = "/api/folders";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const promise = createFolder(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create folder",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating the folder.");
        }
        return res.status(201).json({ message: "Folder created", data });
      }
      case "PUT": {
        const promise = updateFolder(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Update folder",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error updating the folder.");
        }
        return res.status(200).json({ message: "Folder updated", data });
      }
      case "DELETE": {
        const promise = deleteFolder(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Delete folder",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error deleting the folder.");
        }
        return res.status(200).json({ message: "Folder deleted", data });
      }

      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: serverError });
    }
  }
};

export default handler;
