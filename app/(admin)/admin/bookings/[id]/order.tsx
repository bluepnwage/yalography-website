import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/util/formate-date";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { Badge } from "@aomdev/ui";
import { formatNum } from "@/util/formatNum";

const getOrder = async (id: number) => {
  const order = await prisma.orders.findUnique({ where: { id }, include: { booking: true } });

  if (!order) notFound();
  return {
    ...order,
    createdAt: formatDate(order.createdAt),
    booking: { ...order.booking, date: formatDate(order.booking.date) }
  };
};

type PropTypes = {
  id: number;
};

export async function Order({ id }: PropTypes) {
  const order = await getOrder(id);
  return (
    <div className="flex gap-5">
      <div className="basis-4/5">
        <div className="border-b border-gray-200 dark:border-gray-700 flex justify-between pb-4">
          <div className="flex text-sm gap-4 items-center text-gray-500 dark:text-gray-200">
            <Link href={"/admin/"}>
              <IconHome size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
            </Link>
            <IconChevronRight size={14} className="dark:text-gray-200" />
            <Link href={"/admin/bookings"} className=" dark:text-gray-200 hover:text-primary-300">
              Bookings
            </Link>
            <IconChevronRight size={14} className="dark:text-gray-200" />
            <span>{order.booking.id}</span>
          </div>
        </div>
        <section className=" mt-10">
          <header className="col-span-full ">
            <h1 className="font-semibold text-gray-900 dark:text-gray-50 text-4xl capitalize">
              {order.booking.type}
            </h1>
          </header>
          <div className="my-10">
            <h2 className="mb-6 font semibold text-gray-900 dark:text-gray-50 text-2xl">
              Contact information
            </h2>
            <div className="flex flex-col gap-2">
              <p>
                {order.booking.firstName} {order.booking.lastName}
              </p>
              <p>{order.booking.phone}</p>
              <p>{order.booking.email}</p>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="mb-6 font semibold text-gray-900 dark:text-gray-50 text-2xl">Comments</h2>
            <p>{order.booking.description}</p>
          </div>
        </section>
      </div>
      <Sidebar
        quote={order.quote}
        date={order.booking.date}
        environment={order.booking.environment}
        features={order.booking.features?.split(",") || []}
        status={order.booking.status || ""}
      />
    </div>
  );
}

type SidebarProps = {
  status: string;
  date: string;
  environment: boolean;
  features: string[];
  quote: number;
};

function Sidebar({ date, environment, features, status, quote }: SidebarProps) {
  return (
    <div className="basis-1/5 border-l border-l-gray-200 dark:border-l-gray-700  pt-14 px-4">
      <p className="font-medium text-lg mb-8 text-gray-900 dark:text-gray-50">Details</p>
      <ul className="space-y-4 dark:text-gray-300 mb-8 capitalize">
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Status</span>{" "}
          <Badge variant={"status"} color={getStatusColor(status)}>
            {status}
          </Badge>
        </li>
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Date</span> {date}
        </li>
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Quote</span>{" "}
          {formatNum(quote / 100, { currency: "USD", style: "currency" })}
        </li>
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Environment</span>{" "}
          {environment ? "Inside" : "Outside"}
        </li>
      </ul>
      <p className="font-medium text-lg mb-4 text-gray-900 dark:text-gray-50">Add-ons</p>
      <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
        {features.map((feature, index) => {
          return (
            <li key={index} className="flex justify-between capitalize">
              {feature}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function relativeTime(date: string) {
  const formatter = new Intl.RelativeTimeFormat("en-US", { style: "long" });
  const days = Date.parse(date) - Date.now();
  return formatter.format(Math.round(days / 1000 / 60 / 60 / 24), "days");
}

function getStatusColor(status: string) {
  return status === "approved" ? "success" : status === "pending" ? "warn" : "primary";
}
