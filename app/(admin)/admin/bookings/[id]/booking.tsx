import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/util/formate-date";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { BookingButtons } from "@/components/admin/bookings/dynamic/booking-buttons";
import { Badge } from "@aomdev/ui";

const getBooking = async (id: number) => {
  await prisma.$connect();
  const booking = await prisma.bookings.findUnique({ where: { id } });
  await prisma.$disconnect();
  if (!booking) notFound();
  return { ...booking, date: formatDate(booking.date) };
};

type PropTypes = {
  id: number;
};

export async function Booking({ id }: PropTypes) {
  const booking = await getBooking(id);
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
            <span>{booking.id}</span>
          </div>
          <BookingButtons date={booking.date} status={booking.status || ""} id={booking.id} />
        </div>
        <section className=" mt-10">
          <header className="col-span-full ">
            <h1 className="font-semibold text-gray-900 dark:text-gray-50 text-4xl capitalize">
              {booking.type}
            </h1>
            <p className="mt-4 text-gray-300">
              Booking is{" "}
              <span className="font-semibold">{relativeTime(new Date(booking.date).toString())}</span>
            </p>
          </header>
          <div className="my-10">
            <h2 className="mb-6 font semibold text-gray-900 dark:text-gray-50 text-2xl">
              Contact information
            </h2>
            <div className="flex flex-col gap-2">
              <p>
                {booking.firstName} {booking.lastName}
              </p>
              <p>{booking.phone}</p>
              <p>{booking.email}</p>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="mb-6 font semibold text-gray-900 dark:text-gray-50 text-2xl">Comments</h2>
            <p>{booking.description}</p>
          </div>
        </section>
      </div>
      <Sidebar
        date={booking.date}
        environment={booking.environment}
        features={booking.features?.split(",") || []}
        status={booking.status || ""}
      />
    </div>
  );
}

type SidebarProps = {
  status: string;
  date: string;
  environment: boolean;
  features: string[];
};

function Sidebar({ date, environment, features, status }: SidebarProps) {
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
