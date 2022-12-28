import { Anchor, FlexContainer } from "@components/shared";
import { Button } from "@components/shared/client";
import prisma from "@lib/prisma";
import { BookingsProvider } from "@components/admin/reservations/BookingsProvider";

export const revalidate = 0;

type PropTypes = {
  children: React.ReactNode;
};

async function getBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany();
  await prisma.$disconnect();

  const pending = [];
  const completed = [];
  const approved = [];

  for (const booking of bookings) {
    const serializedBooking = { ...booking, date: booking.date.toDateString() };
    if (booking.status === "approved") {
      approved.push(serializedBooking);
    } else if (booking.status === "completed") {
      completed.push(serializedBooking);
    } else {
      pending.push(serializedBooking);
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
            <p>Pending reservations: {bookings.pending.length}</p>
            <Anchor href={"/admin/reservations/pending"}>View pending reservations</Anchor>
          </div>
          <div className="text-center">
            <p>Approved reservations: {bookings.approved.length}</p>
            <Anchor href={"/admin/reservations/approved"}>View approved reservations</Anchor>
          </div>
          <div className="text-center">
            <p>Completed reservations: {bookings.completed.length}</p>
            <Anchor href={"/admin/reservations/approved"}>View completed reservations</Anchor>
          </div>
          <Button>Create Reservation</Button>
        </FlexContainer>
      </div>
      <BookingsProvider {...bookings}>{children}</BookingsProvider>
    </>
  );
}
