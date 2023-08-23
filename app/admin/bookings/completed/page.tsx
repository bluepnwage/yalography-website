//Client components
import { CompletedBookingTable } from "@/components/admin/bookings/completed/CompletedBookingsTable";

//Server components
import { Grid, Title } from "@/components/shared";

import { verifyToken } from "@/lib/firebase/admin/auth";

export default async function CompletedBookingsPage() {
  await verifyToken();

  return (
    <>
      <Title className="mb-4">Completed bookings</Title>
      <Grid fullWidth>
        <div className="col-span-full space-y-4">
          <CompletedBookingTable />
        </div>
      </Grid>
    </>
  );
}
