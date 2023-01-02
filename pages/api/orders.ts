import prisma from "@lib/prisma";
import { Orders } from "@prisma/client";
import { NextApiHandler } from "next";

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
    data: { ...data, month: months[Math.floor(Math.random() * months.length)] }
  });
  await prisma.$disconnect();
  return order;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const json = req.body;
        const data = await createOrder(json);
        return res.status(201).json({ message: "Order created", data });
      }
      default: {
        return res.status(405).json({ mesasge: "Message not allowed" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred on the server" });
  }
};

export default handler;
