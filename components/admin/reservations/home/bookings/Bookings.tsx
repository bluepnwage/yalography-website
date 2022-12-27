import { Title, Card, Grid } from "@components/shared";
import { BookingsCard } from "./BookingsCard";

export function Bookings() {
  return (
    <Grid fullWidth>
      <Card style={{ padding: 0 }} className="col-span-full w-full p-0 overflow-hidden">
        <header className="bg-slate-200 dark:bg-zinc-700 p-4">
          <Title size={"xl"} order={"h2"}>
            Pending Reservations
          </Title>
        </header>
        <BookingsCard status={"pending"} />
      </Card>
      <Card style={{ padding: 0 }} className="col-span-full w-full p-0 overflow-hidden">
        <header className="bg-slate-200 dark:bg-zinc-700 p-4">
          <Title size={"xl"} order={"h2"}>
            Completed Reservations
          </Title>
        </header>
        <BookingsCard status={"approved"} />
      </Card>
    </Grid>
  );
}
