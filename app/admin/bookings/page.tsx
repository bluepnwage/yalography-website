//Server components
import { Title, Card, Grid } from "@components/shared";
import { Calendar } from "@components/admin/bookings/home/ScheduleTracker";
import { ChartSuspense } from "./ChartSuspense";
import { PopularMonthsSuspense } from "./PopularMonthsSuspense";

//Client components
import { LastOrder } from "@components/admin/bookings/home/LastOrder";
import { TotalEarnings } from "@components/admin/bookings/home/TotalEarnings";
import { BookingsCard } from "@components/admin/bookings/home/BookingsCard";
import { OrdersTable } from "@components/admin/bookings/home/OrdersTable";

export const dynamic = "force-dynamic";

export default function BookingsPage() {
  return (
    <>
      <Grid fullWidth>
        <Card className="col-span-6 ">
          <Title className="mb-2" size={"xl"}>
            Bookings
          </Title>
          <p className="text-gray-500 text-sm dark:text-gray-400">Stay up to date with all of your bookings</p>
        </Card>
        <Card className="col-span-3">
          <TotalEarnings />
        </Card>
        <Card className="col-span-3">
          <LastOrder />
        </Card>
        <Card className="w-full col-span-full flex">
          <Calendar />
        </Card>
        <div className="col-span-4 relative overflow-hidden bg-white dark:bg-zinc-800 rounded-md flex flex-col">
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <Title order={"h2"} size={"xl"}>
              Best selling photoshoots
            </Title>
          </div>
          <PopularMonthsSuspense />
        </div>
        <div className="col-span-8 ring-1 ring-zinc-200 dark:ring-zinc-700 rounded-md bg-white dark:bg-zinc-800 flex flex-col  justify-between h-full">
          <div className="border-b border-zinc-200 dark:border-zinc-700 p-2">
            <Title order={"h2"} size={"xl"}>
              Completed bookings
            </Title>
          </div>
          <OrdersTable />
        </div>
        <ChartSuspense />
        <Bookings />
      </Grid>
    </>
  );
}

function Bookings() {
  return (
    <Grid fullWidth className="col-span-full">
      <Card style={{ padding: 0 }} className="col-span-6 w-full p-0 overflow-hidden">
        <header className="border-zinc-200 border-b dark:border-zinc-700 px-4 py-2">
          <Title size={"xl"} order={"h2"}>
            Pending bookings
          </Title>
        </header>
        <BookingsCard status={"pending"} />
      </Card>
      <Card style={{ padding: 0 }} className="col-span-6 w-full p-0 overflow-hidden">
        <header className="border-b  border-zinc-200 dark:border-zinc-700 px-4 py-2">
          <Title size={"xl"} order={"h2"}>
            Approved bookings
          </Title>
        </header>
        <BookingsCard status={"approved"} />
      </Card>
    </Grid>
  );
}
