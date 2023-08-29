import { BookingsProvider } from "@/components/admin/bookings/BookingsProvider";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/firebase/admin/auth";
import { formatDate } from "@/util/formate-date";

export const dynamic = "force-dynamic";

type PropTypes = {
  children: React.ReactNode;
};

const getBookings = async () => {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({ where: { NOT: { status: "completed" } } });
  await prisma.$disconnect();

  const pending = [];
  const approved = [];

  for (const booking of bookings) {
    const serializedBooking = { ...booking, date: booking.date.toDateString() };
    if (booking.status === "approved") {
      approved.push(serializedBooking);
    } else if (booking.status === "pending") {
      pending.push(serializedBooking);
    } else {
      continue;
    }
  }
  return { pending, approved };
};

const getCompletedBookings = cache(async () => {
  await prisma.$connect();
  const completed = await prisma.bookings.findMany({
    where: { status: "completed" },
    include: { orders: true }
  });
  await prisma.$disconnect();
  return completed.map(booking => {
    return {
      ...booking,
      date: formatDate(booking.date, { dateStyle: "full" }),
      orders: {
        ...booking?.orders,
        createdAt: booking.orders?.createdAt
          ? formatDate(booking.orders.createdAt, { dateStyle: "full" })
          : ""
      }
    };
  });
});

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  const bookingsPromise = getBookings();
  const completedBookingsPromise = getCompletedBookings();

  const [bookings, completedBookings] = await Promise.all([bookingsPromise, completedBookingsPromise]);
  return (
    <>
      <BookingsProvider completed={completedBookings} {...bookings}>
        {children}
      </BookingsProvider>
    </>
  );
}
