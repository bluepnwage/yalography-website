import { NextApiHandler } from "next";
import prisma from "@lib/prisma";

import type { Projects } from "@prisma/client";

const development = process.env.NODE_ENV === "development";

async function createProject(data: Projects) {
  await prisma.$connect();
  const project = await prisma.projects.create({ data });
  await prisma.$disconnect();
  return project;
}

async function editProject(data: Projects) {
  await prisma.$connect();
  const project = await prisma.projects.update({ where: { id: data.id }, data });
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
      case "PUT": {
        const query = parseInt(req.query.revalidate as string);
        const data = await editProject(json);
        if (!development && query) {
          await Promise.all([res.revalidate(`/projects/${json.id}`), res.revalidate("/projects")]);
        }
        return res.status(200).json({ message: "Project updated", data });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred on the server", error });
  }
};

export default handler;
