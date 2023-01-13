import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import type { Images } from "@prisma/client";

async function createImage(data: Images) {
  await prisma.$connect();
  const image = await prisma.images.create({ data });
  await prisma.$disconnect();
  return image;
}

async function editImage(data: Images) {
  await prisma.$connect();
  const image = await prisma.images.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return image;
}

async function deleteImage(id: number) {
  await prisma.$connect();
  const image = await prisma.images.delete({ where: { id } });
  await prisma.$disconnect();
  return image;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await createImage(json);
        console.log(data);
        return res.status(201).json({ message: "Image created", data });
      }
      case "PUT": {
        const data = await editImage(json);
        return res.status(200).json({ message: "Image updated", data });
      }
      case "DELETE": {
        const data = await deleteImage(json.id);
        return res.status(200).json({ message: "Image deleted", data });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred on the server" });
  }
};

export default handler;
