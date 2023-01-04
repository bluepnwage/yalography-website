import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import { TaskLists } from "@prisma/client";

async function createTaskList(data: TaskLists) {
  await prisma.$connect();
  const list = await prisma.taskLists.create({ data });
  await prisma.$disconnect();
  return list;
}

async function updateTaskList(data: TaskLists) {
  await prisma.$connect();
  const taskList = await prisma.taskLists.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return taskList;
}

async function deleteTaskList(id: number) {
  await prisma.$connect();
  const taskList = await prisma.taskLists.delete({ where: { id } });
  await prisma.$disconnect();
  return taskList;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await createTaskList(json);
        return res.status(201).json({ message: "Task list created", data });
      }
      case "PUT": {
        const data = await updateTaskList(json);
        return res.status(200).json({ message: "Task list updated", data });
      }
      case "DELETE": {
        const data = await deleteTaskList(json.id);
        return res.status(200).json({ message: "Task list deleted", data });
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
