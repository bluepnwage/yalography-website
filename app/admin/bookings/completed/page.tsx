//Client components
import { OrdersTable } from "@components/admin/bookings/completed/OrdersTable";
import { TotalEarnings } from "@components/admin/bookings/completed/TotalEarnings";
import { LastOrder } from "@components/admin/bookings/completed/LastOrder";

//Server components
import { ChartSuspense } from "./ChartSuspense";
import { PopularMonthsSuspense } from "./PopularMonthsSuspense";
import { Card, Grid, Title } from "@components/shared";

export default async function CompletedBookingsPage() {
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
        <Card className="col-span-3">
          <TotalEarnings />
        </Card>
        <Card className="col-span-3">
          <LastOrder />
        </Card>
        <div className="col-span-4 relative overflow-hidden bg-white dark:bg-zinc-800 rounded-md flex flex-col">
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <Title order={"h2"} size={"xl"}>
              Best selling photoshoots
            </Title>
          </div>
          <PopularMonthsSuspense />
        </div>
        <OrdersTable />
        <ChartSuspense />
      </Grid>
    </>
  );
}
