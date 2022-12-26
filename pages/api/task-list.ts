import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";

async function createTaskList(name: string) {
  await prisma.$connect();
  const list = await prisma.taskLists.create({ data: { name } });
  await prisma.$disconnect();
  return list;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const name = req.body.name;
        const task = await createTaskList(name);
        return res.status(201).json({ message: "Task list created", data: task });
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
