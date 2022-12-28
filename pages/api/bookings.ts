import type { NextApiHandler } from "next";
import type { Bookings } from "@prisma/client";
import prisma from "@lib/prisma";

async function createBooking(data: Bookings) {
  await prisma.$connect();
  const booking = await prisma.bookings.create({ data });
  await prisma.$disconnect();
  return booking;
}

async function updateBooking(data: Bookings) {
  await prisma.$connect();
  const booking = await prisma.bookings.update({ where: { id: data.id }, data });
  await prisma.$disconnect();
  return booking;
}

async function deleteBooking(data: Bookings) {
  await prisma.$connect();
  const booking = await prisma.bookings.delete({ where: { id: data.id } });
  await prisma.$disconnect();
  return booking;
}

type ApiResponse = {
  message: string;
  data?: Bookings;
};

const handler: NextApiHandler<ApiResponse> = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const data = await createBooking(json);
        console.log(data);
        return res.status(201).json({ message: "Booking created", data });
      }
      case "PUT": {
        const data = await updateBooking(json);
        return res.status(200).json({ message: "Booking updated", data });
      }
      case "DELETE": {
        const data = await deleteBooking(json);
        return res.status(200).json({ message: "Booking deleted", data });
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
