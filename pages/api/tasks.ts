import prisma from "@/lib/prisma";
import { logError } from "@/lib/notion";
import { serverError } from "@/util/serverError";
import { handlePromise } from "@/util/handle-promise";

import type { Tasks } from "@prisma/client";
import type { NextApiHandler } from "next";

type Data = {
  name: string;
  description?: string;
};

async function createTask(data: Data) {
  const task = await prisma.tasks.create({ data });

  return task;
}

async function updateTask(data: Tasks) {
  const task = await prisma.tasks.update({ where: { id: data.id }, data });

  return task;
}

async function deleteTask(id: number) {
  await prisma.tasks.delete({ where: { id } });
}

const apiURL = "/api/tasks";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const promise = createTask(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create task",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating a task.");
        }
        return res.status(201).json({ message: "Task created", data });
      }
      case "PUT": {
        const promise = updateTask(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Update task",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error updating a task.");
        }
        return res.status(200).json({ message: "Task updated", data });
      }
      case "DELETE": {
        const promise = deleteTask(json.id);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Delete task",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error deleting a task.");
        }
        return res.status(200).json({ message: "Task Deleted", data });
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
      await logError({
        title: "Server error",
        apiURL,
        description: e.message,
        stackTrace: e.stack,
        statusCode: 500
      });
      res.status(500).json({ message: serverError });
    }
  }
};

export default handler;
