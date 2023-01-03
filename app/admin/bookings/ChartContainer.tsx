import { MonthChart } from "@components/admin/bookings/home/MonthChart";
import prisma from "@lib/prisma";
import { Card, Skeleton } from "@components/shared";

export type ChartData = Awaited<ReturnType<typeof groupMonths>>;

async function groupMonths() {
  await prisma.$connect();
  const months = await prisma.orders.groupBy({
    by: ["month"],
    _count: true,
    _max: { quote: true },
    _avg: { quote: true },
    _sum: { quote: true }
  });
  await prisma.$disconnect();
  return months.map((stat) => {
    return {
      month: stat.month,
      max: stat._max.quote ? stat._max.quote / 100 : 0,
      sum: stat._sum.quote ? stat._sum.quote / 100 : 0,
      avg: stat._avg.quote ? stat._avg.quote / 100 : 0,
      count: stat._count
    };
  });
}

export async function ChartContainer() {
  const data = await groupMonths();
  return (
    <Card style={{ height: 450 }} className="col-span-full flex flex-col gap-2">
      <MonthChart data={data} />
    </Card>
  );
}

export function ChartLoading() {
  return (
    <Card style={{ height: 400 }} className="col-span-full overflow-hidden relative flex flex-col gap-2">
      <Skeleton.Shimmer />
      <div className="border-b -mx-4 flex justify-between border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <Skeleton className="h-5 w-48" />
        <div className="gap-2 flex">
          <Skeleton radius={"md"} className="h-5 w-16" />
          <Skeleton radius={"md"} className="h-5 w-16" />
          <Skeleton radius={"md"} className="h-5 w-16" />
        </div>
      </div>
      <Skeleton className="grow w-full" />
    </Card>
  );
}
