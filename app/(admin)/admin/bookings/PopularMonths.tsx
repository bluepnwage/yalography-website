import { formatNum } from "@/util/formatNum";
import { Skeleton } from "@/components/shared";
import { cache } from "react";
// import { ScrollArea } from "@aomdev/ui";

import prisma from "@/lib/prisma";

type PopularShoots = {
  [type: string]: { count: number; total: number };
};

const popularTypes = cache(async () => {
  await prisma.$connect();
  const test = await prisma.orders.findMany({ include: { booking: { select: { type: true } } } });
  await prisma.$disconnect();
  const obj: PopularShoots = {};
  for (let i = 0; i < test.length; i++) {
    const currentType = test[i].booking.type;
    if (obj[currentType]) {
      obj[currentType].total += test[i].quote / 100;
      obj[currentType].count++;
    } else {
      obj[currentType] = { count: 1, total: test[i].quote / 100 };
    }
  }
  return Object.entries(obj)
    .map(([key, value]) => {
      return {
        type: key,
        value
      };
    })
    .sort((a, b) => {
      return b.value.total - a.value.total;
    });
});

export async function PopularMonths() {
  const data = await popularTypes();

  return (
    <div style={{ height: 500 }} className="grow">
      {data.map(booking => {
        return (
          <div
            key={booking.type}
            className="flex items-center border-b justify-between -mx-4 first-of-type:-mt-4 p-4 last-of-type:border-0 border-zinc-200 dark:border-zinc-700"
          >
            <span className="capitalize grow font-semibold">{booking.type}</span>
            <div className="flex gap-4 ">
              <div className="text-center">
                <span className="block">{booking.value.count}</span>
                <span className="text-gray-400 text-sm">Count</span>
              </div>
              <div className="text-center">
                <span className="block">${formatNum(booking.value.total)}</span>
                <span className="text-gray-400 text-sm">Total</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PopularMonthsLoading() {
  const data = Array(5).fill(null);
  return (
    <div
      style={{ minHeight: 400 }}
      className="relative w-full h-full overflow-hidden justify-evenly flex flex-col"
    >
      <Skeleton.Shimmer />
      {data.map((_, key) => {
        return (
          <div
            key={key}
            className="flex items-center border-b justify-between  p-4 last-of-type:border-0 border-zinc-200 dark:border-zinc-700"
          >
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
        );
      })}
    </div>
  );
}
