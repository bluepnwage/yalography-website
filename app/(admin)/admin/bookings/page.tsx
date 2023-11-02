//Server components
import { Grid } from "@/components/shared";

import { Badge, Card, Skeleton } from "@aomdev/ui";
import { IconClockHour11, IconCheck, IconChevronRight } from "@tabler/icons-react";
import { Title } from "@aomdev/ui";

//Client components
import { OrdersTable, OrdersTableLoading } from "@/components/admin/bookings/home/orders-table";
import { BookingCard } from "@/components/admin/bookings/home/booking-card";
import { CreateResource } from "@/components/admin/create-resource";
import { Suspense } from "react";
import {
  UpcomingBookingsContainer,
  UpcomingBookingsLoading
} from "@/components/admin/bookings/home/upcoming-bookings-container";
import { CalendarContainer } from "@/components/admin/bookings/home/calendar-container";
import { getRescheduled } from "@/lib/admin-data";
import Link from "next/link";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { formatDate } from "@/util/formate-date";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BookingsPage() {
  return (
    <>
      <header className="flex items-center justify-between mb-16 gap-4">
        <Title order={1} className="font-heading font-medium text-4xl leading-none">
          Bookings
        </Title>
        <CreateResource payload="bookings">Create booking</CreateResource>
      </header>

      <Grid fullWidth className="mb-36">
        <div className="w-full col-span-full flex gap-4">
          <Card className="w-full basis-2/3 flex">
            <CalendarContainer />
          </Card>
          <div className="flex flex-col gap-4 grow justify-stretch">
            <BookingCard title="pending" icon={<IconClockHour11 size={"75%"} />} />
            <BookingCard title="approved" icon={<IconCheck size={"75%"} />} />
          </div>
        </div>
        <Suspense fallback={<UpcomingBookingsLoading />}>
          <UpcomingBookingsContainer />
        </Suspense>
      </Grid>
      <Suspense fallback={<UpcomingRescheduledLoading />}>
        <UpcomingRescheduled />
      </Suspense>
      <Grid fullWidth className="mb-20">
        <div className="col-span-full pt-6 ">
          <Title order={2} className="font-heading font-medium mb-6">
            Completed bookings
          </Title>
          <Suspense fallback={<OrdersTableLoading />}>
            <OrdersTable />
          </Suspense>
        </div>
      </Grid>
    </>
  );
}

async function UpcomingRescheduled() {
  const bookings = await getRescheduled();
  const orderedBookings = bookings
    .sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    })
    .slice(0, 3);
  return (
    <>
      <Title order={2} className="col-span-full font-heading font-medium mb-6">
        Rescheduled bookings
      </Title>
      <div className="grid grid-cols-3 gap-20 mb-20">
        {bookings.length === 0 && <p>You don&apos;t have any bookings.</p>}
        {orderedBookings.map(booking => {
          const features = booking.features ? booking.features.split(",") : [];
          return (
            <Link
              href={`/admin/bookings/${booking.id}`}
              className={cardStyles({ className: "group hover:opacity-90 duration-200 ease-out" })}
              key={booking.id}
            >
              <div className="flex justify-between items-center">
                <time className="text-gray-600 inline-block mb-2 dark:text-gray-300">
                  {formatDate(new Date(booking.date))}
                </time>
                <Badge
                  className="capitalize"
                  variant={"status"}
                  color={booking.status === "approved" ? "success" : "warn"}
                >
                  {booking.status}
                </Badge>
              </div>
              <Title order={3} className="font-heading font-medium capitalize mt-6 text-3xl">
                {booking.type}
              </Title>
              <div className="flex justify-between items-center mt-4">
                <p className=" text-gray-700 dark:text-gray-200 font-medium">
                  {features.length} features requested
                </p>
                <IconChevronRight
                  size={16}
                  className="text-gray-700 group-hover:translate-x-1 duration-300 ease-out dark:text-gray-200"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function UpcomingRescheduledLoading() {
  const bookings = Array(3).fill(null);
  return (
    <div className="grid grid-cols-3 gap-20 mb-20">
      {bookings.map((_, index) => {
        return (
          <div
            className={cardStyles({
              className: "group hover:opacity-90 duration-200 ease-out relative overflow-hidden"
            })}
            key={index}
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16 block mb-2 " rounded animate />
              <Skeleton className="w-16 h-3" rounded animate />
            </div>
            <Skeleton className="h-8 w-48 mt-6" rounded animate />
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-2 w-28" rounded animate />
              <IconChevronRight
                size={16}
                className="text-gray-700 group-hover:translate-x-1 duration-300 ease-out dark:text-gray-200"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
