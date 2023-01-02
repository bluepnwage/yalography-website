import { Card, Grid, Title } from "@components/shared";
import prisma from "@lib/prisma";
import { Chart } from "@components/admin/bookings/completed/Chart";
import { OrdersTable } from "@components/admin/bookings/completed/OrdersTable";
import { PopularMonths } from "@components/admin/bookings/completed/PopularMonths";

export type ChartData = Awaited<ReturnType<typeof getPopularMonths>>;
export type QuotesData = Awaited<ReturnType<typeof getQuotes>>;

async function getPopularMonths() {
  await prisma.$connect();
  const months = await prisma.orders.groupBy({
    by: ["month"],
    _count: true,
    _max: { quote: true },
    _avg: { quote: true },
    _sum: { quote: true }
  });
  await prisma.$disconnect();
  return months.map((stat) => {
    return {
      month: stat.month,
      max: stat._max.quote ? stat._max.quote / 100 : 0,
      sum: stat._sum.quote ? stat._sum.quote / 100 : 0,
      avg: stat._avg.quote ? stat._avg.quote / 100 : 0,
      count: stat._count
    };
  });
}
async function lastCompleted() {
  await prisma.$connect();
  const data = await prisma.orders.findFirst({ select: { createdAt: true }, orderBy: { createdAt: "desc" } });
  await prisma.$disconnect();
  return data;
}

type PopularShoots = {
  [type: string]: { count: number; total: number };
};

export type Popular = Awaited<ReturnType<typeof popularTypes>>;

async function popularTypes() {
  await prisma.$connect();
  const test = await prisma.orders.findMany({ include: { booking: { select: { type: true } } } });
  await prisma.$disconnect();
  const obj: PopularShoots = {};
  for (let i = 0; i < test.length; i++) {
    const currentType = test[i].booking.type;
    if (obj[currentType]) {
      obj[currentType].total += test[i].quote;
      obj[currentType].count++;
    } else {
      obj[currentType] = { count: 1, total: test[i].quote };
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
      return b.value.total - a.value.total;
    });
}

async function getQuotes() {
  await prisma.$connect();
  const quotes = await prisma.orders.findMany({
    include: { booking: { select: { firstName: true, lastName: true } } }
  });
  await prisma.$disconnect();
  return quotes.map((quote) => {
    return {
      ...quote,
      createdAt: quote.createdAt.toDateString()
    };
  });
}

export default async function CompletedBookingsPage() {
  // const [data, last, quotes] = await Promise.all([getPopularMonths(), lastCompleted(), getQuotes()]);
  const data = await popularTypes();
  return (
    <>
      <Grid fullWidth>
        <Card className="col-span-6 ">
          <Title className="mb-2" size={"xl"}>
            Bookings
          </Title>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Get in-depth statistics about all of your completed bookings
          </p>
        </Card>
        <Card className="col-span-3">
          <Title order={"h2"} size={"md"} className="mb-2">
            Total earnings
          </Title>
          <p className="text-2xl text-gray-400">$500k</p>
        </Card>
        <Card className="col-span-3">
          <Title order={"h2"} size={"md"} className="mb-2">
            Last order{" "}
          </Title>
          <p className="text-gray-400 text-2xl">{new Date().toLocaleDateString()}</p>
        </Card>
        <div className="col-span-4 bg-white dark:bg-zinc-800 rounded-md flex flex-col">
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <Title order={"h2"} size={"xl"}>
              Best selling photoshoots
            </Title>
          </div>
          <PopularMonths data={data} />
        </div>
        <OrdersTable quotes={quotes} />
        <div
          style={{ height: 400 }}
          className="col-span-full flex flex-col gap-2 rounded-md dark:bg-zinc-800 bg-white "
        >
          <Chart data={chartData} />
        </div>
      </Grid>
    </>
  );
}

function randomNum() {
  return Math.floor(Math.random() * 10000);
}

const chartData = [
  {
    month: "January",
    max: randomNum(),
    avg: randomNum(),
    count: randomNum(),
    sum: randomNum()
  },
  {
    month: "February",
    max: randomNum(),
    avg: randomNum(),
    count: randomNum(),
    sum: randomNum()
  },
  {
    month: "March",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "April",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "May",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "June",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "July",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "August",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "September",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "October",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "November",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  },
  {
    month: "December",
    max: randomNum(),
    avg: randomNum(),
    sum: randomNum(),
    count: randomNum()
  }
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const quotes: Awaited<ReturnType<typeof getQuotes>> = [];

for (let i = 0; i < 25; i++) {
  const randomMonth = months[Math.floor(Math.random() * months.length)];
  quotes.push({
    month: randomMonth,
    quote: randomNum(),
    createdAt: new Date().toDateString(),
    booking: { firstName: "Agis", lastName: "Carty" },
    bookingId: 400,
    id: 1,
    year: 2022
  });
}
