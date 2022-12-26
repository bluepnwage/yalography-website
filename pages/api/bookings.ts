import type { NextApiHandler } from "next";
import type { Bookings } from "@prisma/client";
import prisma from "@lib/prisma";

async function createBooking(data: Bookings) {
  await prisma.$connect();
  const booking = await prisma.bookings.create({ data });
  await prisma.$disconnect();
  return booking;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const json = req.body;
        const data = JSON.parse(json);
        const t = await createBooking(data);
        return res.status(201).json({ message: "Booking created", data: t });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error ocurred on the server" });
  }
};
export default handler;
