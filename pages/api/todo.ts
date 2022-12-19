import type { NextApiHandler } from "next";
import prisma from "@lib/prisma";
import { handlePromise } from "@util/handle-promise";

async function deleteTodo(id: number) {
  await prisma.$connect();
  await prisma.tasks.delete({ where: { id } });
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.body.id;

    const [, error] = await handlePromise(deleteTodo(id));

    if (error) {
      res.status(500).json({ message: "An error ocurred on the server", error });
    } else {
      res.status(200).json({ message: "Todo deleted" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;