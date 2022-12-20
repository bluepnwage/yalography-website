import { Grid } from "@components/shared";
import { BookingsCard } from "./BookingsCard";

const array = Array(9).fill(null);

export function Bookings() {
  return (
    <>
      <Grid fullWidth>
        <BookingsCard bookings={array} status={"pending"} />
        <BookingsCard bookings={array} status={"approved"} />
      </Grid>
    </>
  );
}
