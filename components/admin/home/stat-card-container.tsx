import { StatCard } from "./stat-card";
import { getOrders } from "@/lib/admin-data";
import { Title, Skeleton } from "@aomdev/ui";
import dayjs from "dayjs";

function getDifferencePercentage(oldValue: number, newValue: number, filter: string) {
  if (oldValue === 0) return { value: 100, type: "success" } as const;
  const difference = newValue - oldValue;
  const value = Math.round((difference / oldValue) * 100);
  if (value > 0) {
    return {
      type: "success",
      value
    } as const;
  } else {
    return {
      type: "error",
      value
    } as const;
  }
}

export async function StatCardContainer() {
  const orders = await getOrders();

  const thisYearOrders = orders.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.booking.date);
    return orderDate.getFullYear() === today.getFullYear();
  });

  const thisMonthOrders = orders.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.booking.date);
    return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
  });

  const lastMonth = orders.filter(booking => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const bookingDate = new Date(booking.booking.date);
    return bookingDate.getMonth() === date.getMonth() && bookingDate.getFullYear() === date.getFullYear();
  });

  const lastYear = orders.filter(booking => {
    const year = new Date();
    year.setFullYear(year.getFullYear() - 1);
    const bookingYear = new Date(booking.booking.date);
    return bookingYear.getFullYear() === year.getFullYear();
  });
  return (
    <StatCard
      orders={orders}
      thisMonthOrders={thisMonthOrders}
      thisYearOrders={thisYearOrders}
      lastMonthOrders={lastMonth}
      lastYearOrders={lastYear}
    />
  );
}

export function StatCardLoading() {
  return (
    <div className=" mt-16">
      <div className="flex justify-between items-center mb-8">
        <Title order={2} className="font-heading font-medium">
          Overview
        </Title>
        <Skeleton className="h-10 w-[150px] rounded-sm" animate />
      </div>
      <div className="mt-6 grid grid-cols-4 gap-10">
        <div className="  border-t border-gray-200 dark:border-neutral-700 pt-6">
          <Skeleton rounded animate className="h-12 w-12 mb-4" />
          <Skeleton className="mb-4 h-3 w-32" rounded animate />
        </div>
        <div className="  border-t border-gray-200 dark:border-neutral-700 pt-6">
          <Skeleton rounded animate className="h-12 w-12 mb-4" />
          <Skeleton className="mb-4 h-3 w-32" rounded />
        </div>
        <div className="  border-t border-gray-200 dark:border-neutral-700 pt-6">
          <Skeleton rounded animate className="h-12 w-12 mb-4" />
          <Skeleton className="mb-4 h-3 w-32" rounded animate />
        </div>
        <div className="  border-t border-gray-200 dark:border-neutral-700 pt-6">
          <Skeleton rounded animate className="h-12 w-12 mb-4" />
          <Skeleton className="mb-4 h-3 w-32" rounded animate />
        </div>
      </div>
    </div>
  );
}
