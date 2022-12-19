import { Card } from "@components/shared";
import { ClipboardCheck } from "@lib/icons";
import prisma from "@lib/prisma";
import { handlePromise } from "@util/handle-promise";

async function getOrders() {
  await prisma.$connect();
  const orders = await prisma.bookings.count({ where: { status: "completed" } });
  await prisma.$disconnect();
  console.log(orders);
  return orders;
}

export async function Orders() {
  // const [bookingsCount, error] = await handlePromise(getOrders());
  // console.log(error);
  // console.log(bookingsCount);
  // if (!bookingsCount ?? error) throw new Error(error);
  let bookingsCount = 5;
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">
        <ClipboardCheck size={48} />
      </p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">Orders</p>
        <p className="font-bold text-3xl">{bookingsCount}</p>
      </div>
    </Card>
  );
}

export function OrdersLoading() {
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">
        <ClipboardCheck size={48} />
      </p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">Orders</p>
        <div className="grayscale bg-red-600 animate-pulse h-4 w-16 rounded-xl"></div>
      </div>
    </Card>
  );
}
