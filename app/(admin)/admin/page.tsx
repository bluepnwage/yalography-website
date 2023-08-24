import { WelcomeStats } from "@/components/admin/home/WelcomeStats";
import { Stats } from "@/components/admin/home/Stats";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { Card, Badge, Title } from "@aomdev/ui";
import { formatDate } from "@/util/formate-date";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { cardStyles } from "@aomdev/ui/src/card/styles";

const getBookings = async () => {
  const t = await prisma.bookings.findMany({
    where: { OR: [{ status: "approved" }, { status: "pending" }] },
    take: 3
  });
  console.log(t);
  return t;
};

export default async function AdminPage() {
  const bookings = await getBookings();
  console.log(bookings);
  return (
    <div>
      <WelcomeStats />
      <div>
        <Title order={2} className="font-heading font-medium mb-8 ">
          Upcoming bookings
        </Title>
        <div className="grid grid-cols-3 gap-20 mb-20">
          {bookings.map(booking => {
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
      </div>
      <Stats />
    </div>
  );
}
