import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import type { Images } from "@prisma/client";

async function createImage(data: Images) {
  await prisma.$connect();
  const image = await prisma.images.create({ data });
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
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred on the server" });
  }
};

export default handler;
