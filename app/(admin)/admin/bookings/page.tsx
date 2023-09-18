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
import { CreateResource } from "@/components/admin/create-resource";

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
            <Calendar />
          </Card>
          <div className="flex flex-col gap-4 grow justify-stretch">
            <BookingCard title="pending" icon={<IconClockHour11 size={"75%"} />} />
            <BookingCard title="approved" icon={<IconCheck size={"75%"} />} />
          </div>
        </div>
        <UpcomingBookings />
      </Grid>
      <Grid fullWidth className="mb-20">
        <div className="col-span-full pt-6 ">
          <Title order={2} className="font-heading font-medium mb-6">
            Completed bookings
          </Title>
          <OrdersTable />
        </div>
      </Grid>
    </>
  );
}
