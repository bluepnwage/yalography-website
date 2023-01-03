import dynamic from "next/dynamic";
import prisma from "@lib/prisma";
import { Card, Skeleton, Title } from "@components/shared";
import { formatNum } from "@util/formatNum";

const Table = dynamic(() => import("./Table"), { ssr: false, loading: () => <TableLoading /> });

export type TableData = Awaited<ReturnType<typeof getOrders>>;

async function getOrders() {
  await prisma.$connect();
  const orders = await prisma.orders.findMany({
    include: { booking: { select: { firstName: true, lastName: true, type: true, email: true } } },
    take: 10,
    orderBy: { createdAt: "desc" }
  });
  await prisma.$disconnect();
  return orders.map((order) => {
    return {
      ...order,
      quote: formatNum(order.quote / 100),
      createdAt: order.createdAt.toDateString()
    };
  });
}

export async function TableContainer() {
  const orders = await getOrders();
  return (
    <>
      {orders.length > 0 ? (
        <Table data={orders} />
      ) : (
        <>
          <Title order={"h2"} className="mb-10 text-center">
            Recently completed bookings
          </Title>
          <Card className="mb-20">
            <p className="text-center text-lg">You haven&apos;t completed any reservations yet</p>
          </Card>
        </>
      )}
    </>
  );
}

export function TableLoading() {
  const data = Array(10).fill(null);
  return (
    <>
      <Skeleton className="h-6 w-36 mb-5 mx-auto" />
      <Card className="relative overflow-hidden space-y-5 mb-20">
        <Skeleton.Shimmer />
        {data.map((_, key) => {
          return (
            <div key={key}>
              <Skeleton className="h-4 w-full" />
            </div>
          );
        })}
      </Card>
    </>
  );
}
