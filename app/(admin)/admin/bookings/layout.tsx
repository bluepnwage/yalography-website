import { Anchor, FlexContainer } from "@/components/shared";
import { BookingsProvider } from "@/components/admin/bookings/BookingsProvider";
import { BookingDialog } from "@/components/admin/bookings-dialog";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/firebase/admin/auth";

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
      date: booking.date.toDateString(),
      orders: { ...booking?.orders, createdAt: booking.orders?.createdAt.toDateString() }
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
      {/* <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly">
          <div className="text-center">
            <p>Pending bookings: {bookings.pending.length}</p>
            <Anchor href={"/admin/bookings/pending"}>View pending bookings</Anchor>
          </div>
          <div className="text-center">
            <p>Approved bookings: {bookings.approved.length}</p>
            <Anchor href={"/admin/bookings/approved"}>View approved bookings</Anchor>
          </div>
          <div className="text-center">
            <p>Completed bookings: {completedBookings.length}</p>
            <Anchor href={"/admin/bookings/completed"}>View completed bookings</Anchor>
          </div>
          <BookingDialog />
        </FlexContainer>
      </div> */}
      <BookingsProvider completed={completedBookings} {...bookings}>
        {children}
      </BookingsProvider>
    </>
  );
}
