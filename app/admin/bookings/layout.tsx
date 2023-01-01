import { Anchor, FlexContainer } from "@components/shared";
import { BookingsProvider } from "@components/admin/bookings/BookingsProvider";
import { BookingDialog } from "@components/admin/bookings/BookingDialog";

import prisma from "@lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PropTypes = {
  children: React.ReactNode;
};

async function getBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({ where: { NOT: { status: "completed" } } });
  const completed = (await prisma.bookings.findMany({ where: { status: "completed" }, include: { orders: true } })).map(
    (booking) => {
      return {
        ...booking,
        date: booking.date.toDateString(),
        orders: { ...booking.orders, createdAt: booking.orders?.createdAt.toDateString() }
      };
    }
  );
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
  return { pending, approved, completed };
}

export default async function Layout({ children }: PropTypes) {
  const bookings = await getBookings();

  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
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
            <p>Completed bookings: {bookings.completed.length}</p>
            <Anchor href={"/admin/bookings/approved"}>View completed bookings</Anchor>
          </div>
          <BookingDialog />
        </FlexContainer>
      </div>
      <BookingsProvider {...bookings}>{children}</BookingsProvider>
    </>
  );
}
