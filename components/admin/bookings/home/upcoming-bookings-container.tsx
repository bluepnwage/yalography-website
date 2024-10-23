import { getBookings } from "@/lib/admin-data";
import { UpcomingBookings } from "./upcoming-bookings";
import { Skeleton, Table } from "@aomdev/ui";

export async function UpcomingBookingsContainer() {
  const bookings = await getBookings();
  const pending = bookings.filter((booking) => booking.status === "pending");
  const approved = bookings.filter((booking) => booking.status === "approved");
  return (
    <UpcomingBookings
      pending={pending}
      approved={approved}
    />
  );
}

export function UpcomingBookingsLoading() {
  const bookings = Array(10).fill(null);
  return (
    <>
      <Skeleton
        animate
        className="rounded-md h-10 w-40"
      />
      <Table
        style={{ marginTop: "2rem" }}
        className="w-full"
      >
        <Table.Header>
          <Table.Row>
            <Table.Head>Client</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Environment</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookings.map((_, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />{" "}
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />{" "}
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    rounded
                    animate
                    className="h-3 ww-full"
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
