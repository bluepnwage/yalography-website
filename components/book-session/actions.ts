"use server";
import prisma from "@/lib/prisma";
import { errorActionReturn, successActionReturn } from "@/lib/hooks/action-return";
import { z } from "zod";
import resend, { emailSender } from "@/lib/resend";
import { photoshootTypes } from "@/lib/photoshoot";
import { formatDate } from "@/util/formate-date";
import { EmailTemplate } from "../email-template";

const BookingFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
  time: z.string(),
  shoot_type: z.string(),
  date: z.string(),
  environment: z.string(),
  description: z.string().optional()
});

const url = process.env.VERCEL_URL || "http://localhost:3000";

export async function createBooking(prevState: any, data: FormData) {
  try {
    const form = BookingFormSchema.safeParse(Object.fromEntries(data));
    if (form.success) {
      const { data } = form;
      const booking = await prisma.bookings.create({
        data: {
          date: new Date(data.date),
          email: data.email,
          environment: data.environment === "inside",
          phone: data.phone,
          time: data.time,
          type: data.shoot_type,
          firstName: data.first_name,
          lastName: data.last_name
        }
      });
      const { error } = await resend.emails.send({
        from: emailSender,
        to: data.email,
        subject: `${photoshootTypes.get(data.shoot_type as any)?.label} Booking request`,
        react: EmailTemplate({
          date: formatDate(new Date(data.date), { dateStyle: "long" }),
          location: data.environment ? "Inside" : "Outside",
          url,
          bookingId: booking.id,
          firstName: data.first_name,
          lastName: data.last_name,
          time: data.time,
          type: data.shoot_type
        })
      });
    }
    return successActionReturn("Booking created successfully!");
  } catch (error) {
    console.log(error);
    return errorActionReturn({ inputErrors: null, message: "Failed to create a booking" });
  }
}
