import prisma from "@/lib/prisma";
import { Badge, Table, Title } from "@aomdev/ui";
import { formatDate } from "@/util/formate-date";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { StatCardContainer, StatCardLoading } from "@/components/admin/home/stat-card-container";
import { Suspense } from "react";
import { getBookings } from "@/lib/admin-data";
import { Skeleton } from "@/components/shared";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function greetingMessage(hour: number) {
  if (hour >= 2 && hour <= 11) {
    return `Good morning Yasmino`;
  } else if (hour >= 12 && hour <= 16) {
    return "Good afternoon Yasmino";
  } else {
    return "Good evening Yasmino";
  }
}

export default async function AdminPage() {
  const time = new Date().getHours();
  const greeting = greetingMessage(time);
  return (
    <div>
      <Title order={1} className="font-heading font-medium mb-4 text-4xl">
        {greeting}
      </Title>
      <div className="mb-20">
        <Suspense fallback={<StatCardLoading />}>
          <StatCardContainer />
        </Suspense>
      </div>
      <Title order={2} className="font-heading font-medium mb-8 ">
        Upcoming bookings
      </Title>
      <Suspense fallback={<UpcomingBookingsLoading />}>
        <UpcomingBookings />
      </Suspense>
      <Title order={2} className="font-heading font-medium mb-8">
        Recent orders
      </Title>
      <div className="mb-20">
        <Suspense fallback={<RecentOrdersLoading />}>
          <RecentOrders />
        </Suspense>
      </div>
    </div>
  );
}

async function UpcomingBookings() {
  const bookings = await getBookings();

  return (
    <div className="grid grid-cols-3 gap-20 mb-20">
      {bookings.length === 0 && <p>You don&apos;t have any bookings.</p>}
      {bookings.slice(0, 3).map(booking => {
        const features = booking.features ? booking.features.split(",") : [];
        return (
          <Link
            href={`/admin/bookings/${booking.id}`}
            className={cardStyles({ className: "group hover:opacity-90 duration-200 ease-out" })}
            key={booking.id}
          >
            <div className="flex justify-between items-center">
              <time className="text-gray-600 inline-block mb-2 dark:text-gray-300">
                {formatDate(new Date(booking.date))}
              </time>
              <Badge
                className="capitalize"
                variant={"status"}
                color={booking.status === "approved" ? "success" : "warn"}
              >
                {booking.status}
              </Badge>
            </div>
            <Title order={3} className="font-heading font-medium capitalize mt-6 text-3xl">
              {booking.type}
            </Title>
            <div className="flex justify-between items-center mt-4">
              <p className=" text-gray-700 dark:text-gray-200 font-medium">
                {features.length} features requested
              </p>
              <IconChevronRight
                size={16}
                className="text-gray-700 group-hover:translate-x-1 duration-300 ease-out dark:text-gray-200"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function UpcomingBookingsLoading() {
  const bookings = Array(3).fill(null);
  return (
    <div className="grid grid-cols-3 gap-20 mb-20">
      {bookings.map((_, index) => {
        return (
          <div
            className={cardStyles({
              className: "group hover:opacity-90 duration-200 ease-out relative overflow-hidden"
            })}
            key={index}
          >
            <Skeleton.Shimmer />
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16 block mb-2 " />
              <Skeleton className="w-16 h-3" radius={"full"} />
            </div>
            <Skeleton className="h-8 w-48 mt-6" />
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-2 w-28" />
              <IconChevronRight
                size={16}
                className="text-gray-700 group-hover:translate-x-1 duration-300 ease-out dark:text-gray-200"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const getRecentOrders = async () => {
  await prisma.$connect();
  const orders = await prisma.orders.findMany({ take: 10, include: { booking: true } });
  await prisma.$disconnect();
  return orders;
};

async function RecentOrders() {
  const orders = await getRecentOrders();
  return (
    <Table className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head>Order #</Table.Head>
          <Table.Head>Completed date</Table.Head>
          <Table.Head>Shoot type</Table.Head>
          <Table.Head>Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(order => {
          return (
            <Table.Row key={order.id}>
              <Table.Cell>Order #{order.booking.id}</Table.Cell>
              <Table.Cell>{formatDate(order.createdAt)}</Table.Cell>
              <Table.Cell className="capitalize">{order.booking.type}</Table.Cell>
              <Table.Cell>{formatCurrency(order.quote)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function RecentOrdersLoading() {
  const orders = Array(10).fill(null);
  return (
    <Table className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head>Order #</Table.Head>
          <Table.Head>Completed date</Table.Head>
          <Table.Head>Shoot type</Table.Head>
          <Table.Head>Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((_, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="h-2 w-full" />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton className="h-2 w-full" />
              </Table.Cell>
              <Table.Cell className="capitalize">
                {" "}
                <Skeleton className="h-2 w-full" />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton className="h-2 w-full" />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function formatCurrency(amount: number, options?: Intl.NumberFormatOptions) {
  const formatter = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency", ...options });
  return formatter.format(amount / 100);
}
