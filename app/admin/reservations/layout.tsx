import { Anchor, FlexContainer } from "@components/shared";
import { Button } from "@components/shared/client";
import prisma from "@lib/prisma";

type PropTypes = {
  children: React.ReactNode;
};

async function getBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({});
  await prisma.$disconnect();

  let pending = 0;
  let completed = 0;
  let approved = 0;

  for (const booking of bookings) {
    if (booking.status === "approved") {
      approved++;
    } else if (booking.status === "completed") {
      completed++;
    } else {
      pending++;
    }
  }
  return { pending, approved, completed };
}

export default async function Layout({ children }: PropTypes) {
  const { pending, completed, approved } = await getBookings();

  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly">
          <div className="text-center">
            <p>Pending reservations: {pending}</p>
            <Anchor href={"/admin/reservations/pending"}>View pending reservations</Anchor>
          </div>
          <div className="text-center">
            <p>Approved reservations: {approved}</p>
            <Anchor href={"/admin/reservations/approved"}>View approved reservations</Anchor>
          </div>
          <div className="text-center">
            <p>Completed reservations: {completed}</p>
            <Anchor href={"/admin/reservations/approved"}>View completed reservations</Anchor>
          </div>
          <Button>Create Reservation</Button>
        </FlexContainer>
      </div>
      {children}
    </>
  );
}
