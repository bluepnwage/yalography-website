import prisma from "@/lib/prisma";
import { logError } from "@/lib/notion";
import { serverError } from "@/util/serverError";
import { handlePromise } from "@/util/handle-promise";

import type { Orders } from "@prisma/client";
import type { NextApiHandler } from "next";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December"
];
async function createOrder(data: Orders) {
  await prisma.$connect();
  const order = await prisma.orders.create({
    data
  });
  await prisma.$disconnect();
  return order;
}

const apiURL = "/api/orders";

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const json = req.body;
        const promise = createOrder(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create order",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error creating an order.");
        }
        return res.status(201).json({ message: "Order created", data });
      }
      default: {
        return res.status(405).json({ mesasge: "Method not allowed" });
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
