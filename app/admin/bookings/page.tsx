//Server components
import { Grid } from "@/components/shared";

import { Calendar } from "@/components/admin/bookings/home/ScheduleTracker";
import { Card } from "@aomdev/ui";
import { IconClockHour11, IconCheck } from "@tabler/icons-react";
import { Title } from "@aomdev/ui";

//Client components
import { OrdersTable } from "@/components/admin/bookings/home/orders-table";
import { UpcomingBookings } from "@/components/admin/bookings/home/upcoming-bookings";
import { BookingCard } from "@/components/admin/bookings/home/booking-card";
import { StatCard } from "@/components/admin/bookings/home/stat-card";
import { ChartContainer, ChartLoading } from "./ChartContainer";
import { Suspense } from "react";
import { PopularMonths, PopularMonthsLoading } from "./PopularMonths";

export const dynamic = "force-dynamic";

export default function BookingsPage() {
  return (
    <>
      <Grid fullWidth className="mb-36">
        <div className="w-full col-span-full flex gap-4">
          <Card className="w-full basis-2/3 flex">
            <Calendar />
          </Card>
          <div className="flex flex-col gap-4 grow justify-stretch">
            <BookingCard title="pending" icon={<IconClockHour11 size={"75%"} />} />
            <BookingCard title="approved" icon={<IconCheck size={"75%"} />} />
          </div>
        </div>
        <UpcomingBookings />
        <StatCard />
      </Grid>
      <Grid fullWidth>
        <Card className="col-span-4 relative overflow-hidden  rounded-md flex flex-col">
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <Title order={2} className="font-heading font-medium">
              Best selling photoshoots
            </Title>
          </div>
          <Suspense fallback={<PopularMonthsLoading />}>
            <PopularMonths />
          </Suspense>
        </Card>
        <Suspense fallback={<ChartLoading />}>
          <ChartContainer />
        </Suspense>
        <div className="col-span-full pt-6 ">
          <Title order={2} className="font-heading font-medium">
            Completed bookings
          </Title>
          <OrdersTable />
        </div>
      </Grid>
    </>
  );
}
