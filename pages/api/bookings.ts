import type { NextApiHandler } from "next";
import type { Bookings } from "@prisma/client";
import prisma from "@/lib/prisma";
import { logError } from "@/lib/notion";
import { handlePromise } from "@/util/handle-promise";
import { serverError } from "@/util/serverError";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { formatDate } from "@/util/formate-date";

const resend = new Resend(process.env.RESEND_API_KEY!);

async function createBooking(data: Bookings) {
  const booking = await prisma.bookings.create({ data });

  return booking;
}

async function updateBooking(data: Bookings) {
  const booking = await prisma.bookings.update({ where: { id: data.id }, data });

  return booking;
}

async function deleteBooking(data: Bookings) {
  const booking = await prisma.bookings.delete({ where: { id: data.id } });

  return booking;
}

type ApiResponse = {
  message: string;
  data?: Bookings;
};

const apiURL = "/api/bookings";

const handler: NextApiHandler<ApiResponse> = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        const params = req.query;
        const promise = createBooking(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Create booking",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("Error creating booking.", { cause: data });
        }
        if (params?.email === "1") {
          await resend.emails.send({
            from: "Yalography <onboarding@resend.dev>",
            subject: `${data.type} Booking request`,
            to: "activeoutremer@gmail.com",
            react: EmailTemplate({
              ...data,
              date: formatDate(data.date, { dateStyle: "long" }),
              location: data.environment ? "Inside" : "Outside"
            })
          });
        }
        return res.status(201).json({ message: "Booking created", data });
      }
      case "PUT": {
        const promise = updateBooking(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          logError({
            title: "Update booking",
            apiURL,
            description: data.message,
            stackTrace: data.stack,
            statusCode: 500
          });
          throw new Error("There was an error updating your booking.", { cause: data });
        }
        return res.status(200).json({ message: "Booking updated", data });
      }
      case "DELETE": {
        const promise = deleteBooking(json);
        const [status, data] = await handlePromise(promise);
        if (status === "error") {
          // logError({
          //   title: "Delete booking",
          //   apiURL,
          //   description: data.message,
          //   stackTrace: data.stack,
          //   statusCode: 500
          // });
          throw new Error("There was an error deleting your booking.", { cause: data });
        }

        return res.status(200).json({ message: "Booking deleted" });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: serverError
      });
    }
  }
};
export default handler;
