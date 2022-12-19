import { Button, Card, Title } from "@components/shared";
import { StatCard } from "./StatCard";
import { ClipboardCheck, ClipboardMoney } from "@lib/icons";

import prisma from "@lib/prisma";

async function getBookings() {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({
    select: { status: true, id: true },
    where: { OR: [{ status: "pending" }, { status: "completed" }] }
  });
  await prisma.$disconnect();

  const pending: number[] = [];
  const completed: number[] = [];

  for (const booking of bookings) {
    if (booking.status === "pending") {
      pending.push(booking.id);
    } else {
      completed.push(booking.id);
    }
  }
  return { pending, completed };
}

export async function WelcomeStats() {
  const { completed, pending } = await getBookings();
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCard stat={pending} />
      <Orders stat={completed} />
      <StatCard Icon={<ClipboardMoney size={48} />} title="Total revenue" stat={"$87k"} />
    </div>
  );
}

export async function WelcomeStatsLoading() {
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCardLoading />
      <OrdersLoading />
      <StatCard Icon={<ClipboardMoney size={48} />} title="Total revenue" stat={"$87k"} />
    </div>
  );
}

type PropTypes = {
  stat: number[];
};

function WelcomeCard({ stat }: PropTypes) {
  return (
    <Card className="space-y-2 basis-3/6">
      <Title order={"h1"} size={"xl"}>
        Welcome back Yasmino
      </Title>
      <p>
        You currently have <strong>{stat.length}</strong> pending bookings.
      </p>
      <Button component="a" href={"/admin/reservations"}>
        View reservations
      </Button>
    </Card>
  );
}

function WelcomeCardLoading() {
  return (
    <Card className="space-y-2 basis-3/6">
      <div className="animate-pulse grayscale bg-red-600 h-3 rounded-xl w-1/4" />
      <div className="animate-pulse grayscale bg-red-600 h-3 rounded-xl w-2/3" />
      <div className="animate-pulse grayscale bg-red-600 rounded-xl w-24 h-10" />
    </Card>
  );
}

function Orders({ stat }: PropTypes) {
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">
        <ClipboardCheck size={48} />
      </p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">Orders</p>
        <p className="font-bold text-3xl">{stat.length}</p>
      </div>
    </Card>
  );
}

function OrdersLoading() {
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">
        <ClipboardCheck size={48} />
      </p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <div className="grayscale bg-red-600 animate-pulse h-3 w-10 rounded-xl" />
        <div className="grayscale bg-red-600 animate-pulse h-10 w-20 rounded-xl"></div>
      </div>
    </Card>
  );
}
