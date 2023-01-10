import { NextApiHandler } from "next";
import prisma from "@lib/prisma";

import type { Projects } from "@prisma/client";

async function createProject(data: Projects) {
  await prisma.$connect();
  const project = await prisma.projects.create({ data });
  await prisma.$disconnect();
  return project;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await createProject(json);
        return res.status(201).json({ message: "Project createad", data });
      }
      default: {
        return res.status(201).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server", error });
  }
};

export default handler;
