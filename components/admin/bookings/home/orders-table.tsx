import { formatNum } from "@/util/formatNum";
import Link from "next/link";
import { Table, Skeleton } from "@aomdev/ui";
import { getOrders } from "@/lib/admin-data";

export async function OrdersTable() {
  const orders = await getOrders();
  return (
    <>
      <Table style={{ flexGrow: 1 }} className="grow w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Quote</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map(order => {
            const amount = order.quote ? formatNum(order.quote / 100) : 0;
            return (
              <Table.Row key={order.id}>
                <Table.Cell>
                  {order.booking.firstName} {order.booking.lastName}
                </Table.Cell>
                <Table.Cell className="capitalize">{order.booking.type}</Table.Cell>
                <Table.Cell>{order.booking.date}</Table.Cell>
                <Table.Cell>${amount}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/admin/bookings/${order.booking.id}?completed=true`}
                    className="text-yellow-600 dark:text-yellow-500"
                  >
                    View
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

export function OrdersTableLoading() {
  const bookings = Array(10).fill(null);
  return (
    <Table style={{ marginTop: "2rem" }} className="w-full">
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
                <Skeleton rounded animate className="h-3 ww-full" />
              </Table.Cell>
              <Table.Cell className="capitalize">
                <Skeleton rounded animate className="h-3 ww-full" />{" "}
              </Table.Cell>
              <Table.Cell>
                <Skeleton rounded animate className="h-3 ww-full" />{" "}
              </Table.Cell>
              <Table.Cell>
                <Skeleton rounded animate className="h-3 ww-full" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton rounded animate className="h-3 ww-full" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton rounded animate className="h-3 ww-full" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton rounded animate className="h-3 ww-full" />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
