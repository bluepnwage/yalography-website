import { StatCard } from "./stat-card";
import prisma from "@/lib/prisma";

const getOrders = async () => {
  await prisma.$connect();
  const bookings = await prisma.bookings.findMany({
    include: { orders: true },
    where: { status: "completed" }
  });
  await prisma.$disconnect();
  return bookings.map(booking => {
    return {
      ...booking,
      date: booking.date.toDateString(),
      orders: { ...booking?.orders, createdAt: booking.orders?.createdAt.toDateString() }
    };
  });
};

export async function StatCardContainer() {
  const orders = await getOrders();
  return <StatCard orders={orders} />;
}
