import type { NextApiHandler } from "next";
import type { Bookings } from "@prisma/client";
import prisma from "@/lib/prisma";
import { logError } from "@/lib/notion";
import { handlePromise } from "@/util/handle-promise";
import { serverError } from "@/util/serverError";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { formatDate } from "@/util/formate-date";
import { photoshootTypes } from "@/lib/photoshoot";
import { DeleteTemplate } from "@/components/delete-template";
import { RescheduleTemplate } from "@/components/reschedule-template";
import { RescheduleApproveTemplate } from "@/components/reschedule-approve-template";

const resend = new Resend(process.env.RESEND_API_KEY!);

const emailRecipient = process.env.EMAIL_RECIPIENT!;

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
  cause?: any;
};

const apiURL = "/api/bookings";

const url = process.env.VERCEL_URL || "http://localhost:3000";

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
            from: emailRecipient,
            subject: `${photoshootTypes.get(data.type as any)?.label} Booking request`,
            to: json.email,
            react: EmailTemplate({
              ...data,
              date: formatDate(data.date, { dateStyle: "long" }),
              location: data.environment ? "Inside" : "Outside",
              url,
              bookingId: data.id
            })
          });
        }
        return res.status(201).json({ message: "Booking created", data });
      }
      case "PUT": {
        const { dates, ...jsonData } = json;
        const promise = updateBooking(jsonData);
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
        const query = req.query;
        if (query.reschedule) {
          await resend.emails.send({
            from: emailRecipient,
            to: data.email,
            subject: "Booking Rescheduled",
            react: RescheduleTemplate({
              firstName: data.firstName,
              lastName: data.lastName,
              time: data.time,
              date: formatDate(data.date),
              dates
            })
          });
        }
        if (query.reschedule_approve) {
          await resend.emails.send({
            from: emailRecipient,
            subject: "Booking Rescheduling Approved",
            to: data.email,
            react: RescheduleApproveTemplate({
              firstName: data.firstName,
              lastName: data.lastName,
              date: formatDate(data.date),
              time: data.time
            })
          });
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
        const params = req.query;
        if (params.send_email) {
          await resend.emails.send({
            to: data.email,
            subject: " Booking Cancelled ",
            from: emailRecipient,
            react: DeleteTemplate({ firstName: data.firstName, lastName: data.lastName })
          });
        }
        return res.status(200).json({ message: "Booking deleted" });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message, cause: error.cause });
    } else {
      res.status(500).json({
        message: serverError
      });
    }
  }
};
export default handler;
