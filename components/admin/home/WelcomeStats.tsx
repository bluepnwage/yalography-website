import { Card, Title, Skeleton } from "@components/shared";
import { Button } from "@components/shared/Button";
import { ClipboardCheck, ClipboardMoney } from "@lib/icons";

import prisma from "@lib/prisma";
import { formatNum } from "@util/formatNum";

async function getBookings() {
  await prisma.$connect();
  const pending = await prisma.bookings.count({
    where: { status: "pending" }
  });
  const orders = await prisma.orders.aggregate({ _count: { _all: true }, _sum: { quote: true } });
  await prisma.$disconnect();
  return { pending, orders };
}

export async function WelcomeStats() {
  const { orders, pending } = await getBookings();
  const totalSum = orders._sum.quote ? orders._sum.quote / 100 : 0;
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCard stat={pending} />
      <Orders stat={orders._count._all} title={"Completed bookings"} Icon={<ClipboardCheck size={48} />} />
      <Orders stat={`$${formatNum(totalSum)}`} title={"Total Revenue"} Icon={<ClipboardMoney size={48} />} />
    </div>
  );
}

export async function WelcomeStatsLoading() {
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCardLoading />
      <OrdersLoading />
      <OrdersLoading />
    </div>
  );
}

type PropTypes = {
  stat: number | string;
  title?: string;
  Icon?: React.ReactNode;
};

function WelcomeCard({ stat }: PropTypes) {
  return (
    <Card className="space-y-2 basis-3/6">
      <Title order={"h1"} size={"xl"}>
        Welcome back Yasmino
      </Title>
      <p>
        You currently have <strong>{stat}</strong> pending bookings.
      </p>
      <Button component="a" href={"/admin/bookings"}>
        View bookings
      </Button>
    </Card>
  );
}

function WelcomeCardLoading() {
  return (
    <Card className="space-y-2 basis-3/6 relative overflow-hidden">
      <Skeleton.Shimmer />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="w-24 h-10" />
    </Card>
  );
}

function Orders({ stat, Icon, title }: PropTypes) {
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">{Icon}</p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">{title}</p>
        <p className="font-bold text-3xl">{stat}</p>
      </div>
    </Card>
  );
}

function OrdersLoading() {
  return (
    <Card className="basis-1/6 grow flex items-center relative overflow-hidden">
      <Skeleton.Shimmer />
      <div className="basis-1/4">
        <Skeleton radius={"full"} className={"w-16 h-16"} />
      </div>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-10 w-20" />
      </div>
    </Card>
  );
}
