import prisma from "@lib/prisma";
import { logError } from "@lib/notion";
import { serverError } from "@util/serverError";
import { handlePromise } from "@util/handle-promise";

import type { Projects } from "@prisma/client";
import type { NextApiHandler } from "next";

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

async function deleteProject(id: number) {
  await prisma.$connect();
  const project = await prisma.projects.delete({ where: { id } });
  await prisma.$disconnect();
  return project;
}

async function checkPins() {
  await prisma.$connect();
  const pinnedCount = await prisma.projects.count({ where: { pinned: true } });
  await prisma.$disconnect();
  return pinnedCount;
}

const apiURL = "/api/projects";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const promise = createProject(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create project",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating a project.");
        }
        return res.status(201).json({ message: "Project createad", data });
      }
      case "PUT": {
        const query = parseInt(req.query.revalidate as string);
        const pin = parseInt(req.query.pin as string);
        if (pin) {
          const pinnedCount = await checkPins();
          if (pinnedCount >= 4) {
            return res
              .status(400)
              .json({ message: "Exceeded pin count. You can only have a maximum of 4 pinned projects." });
          }
        }
        const promise = editProject(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Edit project",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error editing a project.");
        }
        if (!development && query) {
          await Promise.all([res.revalidate(`/projects/${json.id}`), res.revalidate("/projects")]);
        }
        return res.status(200).json({ message: "Project updated", data });
      }
      case "DELETE": {
        const query = parseInt(req.query.revalidate as string);
        const promise = deleteProject(json.id);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Delete project",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error deleting a project.");
        }
        if (!development && query) {
          await Promise.all([res.revalidate(`/projects/${json.id}`), res.revalidate("/projects")]);
        }
        return res.status(200).json({ message: "Project deleted", data });
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
