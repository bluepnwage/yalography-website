import prisma from "@lib/prisma";
import { logError } from "@lib/notion";
import { serverError } from "@util/serverError";
import { handlePromise } from "@util/handle-promise";

import type { TaskLists } from "@prisma/client";
import type { NextApiHandler } from "next";

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

const apiURL = "/api/task-list";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const promise = createTaskList(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create task list",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating a task list.");
        }
        return res.status(201).json({ message: "Task list created", data });
      }
      case "PUT": {
        const promise = updateTaskList(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Update task list",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error updating a task list.");
        }
        return res.status(200).json({ message: "Task list updated", data });
      }
      case "DELETE": {
        const promise = deleteTaskList(json.id);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Delete task list",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error deleting a task list.");
        }
        return res.status(200).json({ message: "Task list deleted", data });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      const e = error as any;
      await logError({ title: "Server error", apiURL, description: e.message, stackTrace: e.stack, statusCode: 500 });
      res.status(500).json({ message: serverError });
    }
  }
};
export default handler;
