import { Card, Grid, Title } from "@components/shared";
import prisma from "@lib/prisma";
import { Chart } from "@components/admin/bookings/Chart";

export type ChartData = Awaited<ReturnType<typeof getPopularMonths>>;

async function getPopularMonths() {
  await prisma.$connect();
  const months = await prisma.orders.groupBy({
    by: ["month"],
    _count: true,
    _max: { quote: true },
    _avg: { quote: true },
    _sum: { quote: true }
  });
  await prisma.$disconnect();
  return months;
}
async function lastCompleted() {
  await prisma.$connect();
  const data = await prisma.orders.findFirst({ select: { createdAt: true }, orderBy: { createdAt: "desc" } });
  await prisma.$disconnect();
  return data;
}
export default async function CompletedBookingsPage() {
  const data = await getPopularMonths();
  const last = await lastCompleted();
  console.log(data);
  return (
    <>
      <Grid fullWidth>
        <Card className="col-span-6 ">
          <Title className="mb-2" size={"xl"}>
            Bookings
          </Title>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Get in-depth statistics about all of your completed bookings
          </p>
        </Card>
        <Card className="col-span-3"></Card>
        <Card className="col-span-3">
          <p>Last succesful order: {last?.createdAt.toDateString()}</p>
        </Card>
        <Card className="h-96 col-span-4">
          <Title size={"xl"} order={"h2"}>
            Most popular months
          </Title>
          <p className="text-gray-400 mb-5">Based on average</p>
          {data.map((booking) => {
            const stat = booking._avg.quote ? booking._avg.quote / 100 : 0;
            return (
              <div key={booking.month} className="border-b -mx-4 border-zinc-200 py-2 px-4 dark:border-zinc-700">
                <p>
                  {booking.month}: ${stat}
                </p>
              </div>
            );
          })}
        </Card>
        <div className="col-span-8 rounded-md dark:bg-zinc-800 bg-white ">
          <Chart data={data} />
        </div>
      </Grid>
    </>
  );
}
