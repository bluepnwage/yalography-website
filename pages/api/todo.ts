import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import type { Tasks } from "@prisma/client";

async function deleteTodo(id: number) {
  await prisma.$connect();
  await prisma.tasks.delete({ where: { id } });
  await prisma.$disconnect();
}

type Data = {
  name: string;
  description?: string;
};

async function addTodo(data: Data) {
  await prisma.$connect();
  const task = await prisma.tasks.create({ data });
  await prisma.$disconnect();
  return task;
}

async function updateTodo(id: number, data: Tasks) {
  await prisma.$connect();
  const task = await prisma.tasks.update({ where: { id }, data });
  await prisma.$connect();
  return task;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await addTodo(json);
        return res.status(201).json({ message: "Task created", data });
      }
      case "PUT": {
        const data = await updateTodo(json.id, json.data);
        return res.status(200).json({ message: "Task updated", data });
      }
      case "DELETE": {
        const data = await deleteTodo(json.id);
        return res.status(200).json({ message: "Task Deleted", data });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error ocurred on the server", error });
  }
};

export default handler;
