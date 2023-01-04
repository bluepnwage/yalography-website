import { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import type { ImageFolders } from "@prisma/client";

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

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await createFolder(json);
        return res.status(201).json({ message: "Folder created", data });
      }
      case "PUT": {
        const data = await updateFolder(json);
        return res.status(200).json({ message: "Folder updated", data });
      }
      case "DELETE": {
        const data = await deleteFolder(json.id);
        return res.status(200).json({ message: "Folder deleted", data });
      }

      default: {
        res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
};

export default handler;
