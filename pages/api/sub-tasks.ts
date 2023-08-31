import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";
import type { SubTasks } from "@prisma/client";
import { handlePromise } from "@/util/handle-promise";

async function createSubTask(data: SubTasks) {
  await prisma.$connect();
  const subTasks = await prisma.subTasks.create({ data });
  await prisma.$disconnect();
  return subTasks;
}

async function updateSubTask(data: SubTasks) {
  await prisma.$disconnect();
  const subTask = await prisma.subTasks.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return subTask;
}

const handler: NextApiHandler = async (req, res) => {
  const json = req.body;
  switch (req.method) {
    case "POST": {
      const promise = createSubTask(json);
      const [status, data] = await handlePromise(promise);
      if (status === "error") {
        return res.status(500).json({ message: "Failed to create subtask" });
      } else {
        return res.status(201).json({ message: "Subtask created", data });
      }
    }
    case "PUT": {
      const promise = updateSubTask(json);
      const [status, data] = await handlePromise(promise);
      if (status === "error") {
        return res.status(500).json({ message: "Failed to update subtask" });
      } else {
        return res.status(200).json({ message: "Subtask updated", data });
      }
    }

    default: {
      return res.status(405).json({ message: "Method does not exist" });
    }
  }
};

export default handler;
