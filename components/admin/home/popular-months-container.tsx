import prisma from "@/lib/prisma";
import { BarChartExample } from "./popular-months";
import { Skeleton } from "@aomdev/ui";

function createMonth(month: string) {
  return {
    month,
    max: 0,
    avg: 0,
    sum: 0,
    count: 0
  };
}

const groupMonths = async () => {
  const months = await prisma.orders.groupBy({
    by: ["month"],
    _count: true,
    _max: { quote: true },
    _avg: { quote: true },
    _sum: { quote: true }
  });

  const month: Record<
    string,
    Partial<{
      month: string;
      max: number;
      sum: number;
      avg: number;
      count: number;
    }>
  > = {
    january: createMonth("January"),
    february: createMonth("February"),
    march: createMonth("March"),
    april: createMonth("April"),
    may: createMonth("May"),
    june: createMonth("June"),
    july: createMonth("July"),
    august: createMonth("August"),
    september: createMonth("September"),
    october: createMonth("October"),
    november: createMonth("November"),
    december: createMonth("December")
  };
  for (const data of months) {
    const currentMonth = data.month.toLowerCase() as keyof typeof month;
    month[currentMonth] = {
      month: data.month,
      max: Math.round(data._max.quote ? data._max.quote / 100 : 0),
      sum: Math.round(data._sum.quote ? data._sum.quote / 100 : 0),
      avg: Math.round(data._avg.quote ? data._avg.quote / 100 : 0),
      count: data._count
    };
  }
  return Object.values(month).map(value => {
    return value;
  });
};

const groupYears = async () => {
  const data = await prisma.orders.groupBy({
    by: ["year"],
    _count: true,
    _max: { quote: true },
    _avg: { quote: true },
    _sum: { quote: true }
  });

  return data.map(stat => ({
    year: stat.year,
    avg: Math.round(stat._avg.quote ? stat._avg.quote / 100 : 0),
    max: Math.round(stat._max.quote ? stat._max.quote / 100 : 0),
    sum: Math.round(stat._sum.quote ? stat._sum.quote / 100 : 0),
    count: stat._count
  }));
};

export type ChartMonthsData = Awaited<ReturnType<typeof groupMonths>>;
export type ChartYearsData = Awaited<ReturnType<typeof groupYears>>;

export async function PopularMonthsContainer() {
  const monthPromise = groupMonths();
  const yearPromise = groupYears();
  const [months, years] = await Promise.all([monthPromise, yearPromise]);
  return <BarChartExample months={months} years={years} />;
}

export function BarChartLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" rounded animate />
        <Skeleton className="h-5 w-24" rounded animate />
      </div>
    </>
  );
}
