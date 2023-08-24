import { Skeleton } from "@/components/shared";
import { Chart } from "./Chart";
import { Card, Title } from "@aomdev/ui";

import prisma from "@/lib/prisma";
async function getBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.groupBy({
    by: ["type"],
    _count: true,
    where: {
      NOT: {
        status: "completed"
      }
    }
  });
  await prisma.$disconnect();

  return bookings;
}

export async function ChartContainer() {
  const bookings = await getBookings();
  return (
    <Card className="col-span-4 text-center flex flex-col">
      <Title order={3} className="mb-5 font-heading font-medium">
        Total Bookings
      </Title>
      <Chart data={bookings} />
    </Card>
  );
}

export function ChartLoading() {
  return (
    <Card className="col-span-4 relative overflow-hidden text-center flex flex-col">
      <Skeleton.Shimmer />
      <Skeleton className="h-6 w-36 mb-5 mx-auto" />
      <Skeleton radius={"full"} className="w-full aspect-square" />
    </Card>
  );
}
