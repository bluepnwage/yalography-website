import { Skeleton } from "@/components/shared";
import { ClipboardCheck, ClipboardMoney } from "@/lib/icons";
import { Card, Title, Button } from "@aomdev/ui";

import prisma from "@/lib/prisma";
import { formatNum } from "@/util/formatNum";
import { cache, Suspense } from "react";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

export function WelcomeStats() {
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <Suspense fallback={<WelcomeCardLoading />}>
        <WelcomeCard />
      </Suspense>
      <Suspense fallback={<OrdersContainerLoading />}>
        <OrdersContainer />
      </Suspense>
    </div>
  );
}

const getPending = cache(async () => {
  await prisma.$connect();
  const pending = await prisma.bookings.count({ where: { status: "pending" } });
  await prisma.$disconnect();
  return pending;
});

async function WelcomeCard() {
  const stat = await getPending();
  return (
    <Card className="space-y-2 basis-3/6">
      <Title order={1} className="text-3xl font-heading font-medium">
        Welcome back Yasmino
      </Title>
      <p>
        You currently have <strong>{stat}</strong> pending bookings.
      </p>
      <Link className={buttonStyles({ className: "w-fit" })} href={"/admin/bookings"}>
        View bookings
      </Link>
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

const getOrders = cache(async () => {
  await prisma.$connect();
  const orders = await prisma.orders.aggregate({ _count: { _all: true }, _sum: { quote: true } });
  await prisma.$disconnect();
  return orders;
});

async function OrdersContainer() {
  const orders = await getOrders();
  const totalSum = orders._sum.quote ? orders._sum.quote / 100 : 0;

  return (
    <>
      <Orders stat={orders._count._all} title={"Completed bookings"} Icon={<ClipboardCheck size={48} />} />
      <Orders stat={`$${formatNum(totalSum)}`} title={"Total Revenue"} Icon={<ClipboardMoney size={48} />} />
    </>
  );
}

type PropTypes = {
  stat: number | string;
  title?: string;
  Icon?: React.ReactNode;
};

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

function OrdersContainerLoading() {
  return (
    <>
      <OrdersLoading />
      <OrdersLoading />
    </>
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
