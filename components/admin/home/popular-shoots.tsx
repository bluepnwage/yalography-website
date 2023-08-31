import prisma from "@/lib/prisma";
import { formatNum } from "@/util/formatNum";
import { Card, Table, Title, Skeleton } from "@aomdev/ui";

type PopularShoots = {
  [type: string]: { count: number; total: number };
};

const popularTypes = async () => {
  await prisma.$connect();
  const test = await prisma.orders.findMany({ include: { booking: { select: { type: true } } } });
  await prisma.$disconnect();
  const obj: PopularShoots = {};
  for (let i = 0; i < test.length; i++) {
    const currentType = test[i].booking.type;
    if (obj[currentType]) {
      obj[currentType].total += test[i].quote / 100;
      obj[currentType].count++;
    } else {
      obj[currentType] = { count: 1, total: test[i].quote / 100 };
    }
  }
  return Object.entries(obj)
    .map(([key, value]) => {
      return {
        type: key,
        value
      };
    })
    .sort((a, b) => {
      return b.value.count - a.value.count;
    });
};

export async function PoplularShoots() {
  const shoots = await popularTypes();
  return (
    <Card>
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Most popular bookings
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Type</Table.Head>
            <Table.Head>Count</Table.Head>
            <Table.Head>Total</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shoots.map(shoot => {
            return (
              <Table.Row key={shoot.type}>
                <Table.Cell className="capitalize">{shoot.type}</Table.Cell>
                <Table.Cell>{shoot.value.count}</Table.Cell>
                <Table.Cell>
                  {formatNum(shoot.value.total, { currency: "USD", style: "currency" })}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
}

export function PopularShootsLoading() {
  const shoots = Array(5).fill(null);
  return (
    <Card className="">
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Most popular bookings
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Type</Table.Head>
            <Table.Head>Count</Table.Head>
            <Table.Head>Total</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shoots.map((_, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
}
