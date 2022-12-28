import dynamic from "next/dynamic";
import prisma from "@lib/prisma";
import { Card, Skeleton, Title } from "@components/shared";

const Table = dynamic(() => import("./Table"), { ssr: false, loading: () => <TableLoading /> });

export type TableData = Awaited<ReturnType<typeof getCompletedBookings>>;

async function getCompletedBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({
    where: { status: "completed" },
    select: { firstName: true, lastName: true, type: true, date: true, email: true, id: true },
    take: 10
  });
  await prisma.$disconnect();
  return bookings.map((booking) => {
    return {
      ...booking,
      date: booking.date.toDateString()
    };
  });
}

export async function TableContainer() {
  const bookings = await getCompletedBookings();
  return (
    <>
      {bookings.length > 0 ? (
        <Table data={bookings} />
      ) : (
        <>
          <Title order={"h2"} className="mb-10 text-center">
            Recently completed bookings
          </Title>
          <Card className="mb-20">
            <p className="text-center text-lg">You haven&apos;t completed any reservations yet</p>
          </Card>
        </>
      )}
    </>
  );
}

export function TableLoading() {
  const data = Array(10).fill(null);
  return (
    <>
      <Skeleton className="h-6 w-36 mb-5 mx-auto" />
      <Card className="relative overflow-hidden space-y-5 mb-20">
        <Skeleton.Shimmer />
        {data.map((_, key) => {
          return (
            <div key={key}>
              <Skeleton className="h-4 w-full" />
            </div>
          );
        })}
      </Card>
    </>
  );
}
