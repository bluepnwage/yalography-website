import { Grid } from "@/components/shared";
import { Card, Title, Skeleton, Table, ThemeIcon } from "@aomdev/ui";
import { AomCalendar } from "./default-calendar";
import { IconCheck, IconClockHour11 } from "@tabler/icons-react";

export default function Loading() {
  const paginatedList = Array(5).fill(null);
  const bookings = Array(5).fill(null);
  return (
    <>
      <header className="flex items-center justify-between mb-16 gap-4">
        <Title order={1} className="font-heading font-medium text-4xl leading-none">
          Bookings
        </Title>
        <Skeleton animate className="rounded-md h-8 w-32" />
      </header>
      <Grid fullWidth className="mb-36">
        <div className="w-full col-span-full flex gap-4">
          <Card className="w-full basis-2/3  flex">
            <div className="basis-1/2 bg-neutral-50/60  dark:bg-neutral-900 rounded-md -ml-4 -my-4 px-4 py-4 ">
              <AomCalendar />
              <div className="flex gap-2 flex-col  mt-5 ">
                <div className="flex grow gap-2 items-center text-sm text-center">
                  <Skeleton animate rounded className="w-28 h-3" />
                </div>
                <div className="flex grow gap-2 items-center text-sm text-center">
                  <Skeleton animate rounded className="w-32 h-3" />
                </div>
                <div className="flex grow gap-2 items-center text-sm text-center">
                  <Skeleton animate rounded className="w-48 h-3" />
                </div>
              </div>
            </div>
            <div className="basis-1/2 pl-5">
              <Table style={{ flexGrow: 1, height: "75%" }} className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Status</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {paginatedList.map((_, key) => {
                    return (
                      <Table.Row key={key}>
                        <Table.Cell>
                          <Skeleton className="h-3 w-full" rounded animate />
                        </Table.Cell>
                        <Table.Cell className=" capitalize">
                          {" "}
                          <Skeleton className="h-3 w-full" rounded animate />
                        </Table.Cell>
                        <Table.Cell className="capitalize">
                          <Skeleton className="h-3 w-full" rounded animate />
                        </Table.Cell>
                        <Table.Cell>
                          <Skeleton className="h-3 w-full" rounded animate />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          </Card>
          <div className="flex flex-col gap-4 grow justify-stretch">
            <Card className="grow relative flex justify-between flex-col">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" rounded animate />
                <ThemeIcon variant={"light"}>
                  <IconClockHour11 size={"75%"} />
                </ThemeIcon>
              </div>
              <div className="space-y-4">
                <Skeleton rounded animate className="w-14 h-14" />

                <Skeleton className="h-3 w-1/2" rounded animate />
              </div>
            </Card>
            <Card className="grow relative flex justify-between flex-col">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" rounded animate />
                <ThemeIcon variant={"light"}>
                  <IconCheck size={"75%"} />
                </ThemeIcon>
              </div>
              <div className="space-y-4">
                <Skeleton rounded animate className="w-14 h-14" />

                <Skeleton className="h-3 w-1/2" rounded animate />
              </div>
            </Card>
            {/* <BookingCard title="approved" icon={<IconCheck size={"75%"} />} /> */}
          </div>
        </div>
        <div className="col-span-full mt-16">
          <Title order={2} className="font-heading text-gray-900 dark:text-gray-50 font-medium mb-6">
            Upcoming Bookings
          </Title>
          <Skeleton animate className="rounded-md h-10 w-40" />
          <Table style={{ marginTop: "2rem" }} className="w-full">
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Environment</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Time</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {bookings.map((_, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      <Skeleton rounded animate className="h-3 ww-full" />{" "}
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />{" "}
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Grid>
      <Grid fullWidth className="mb-20">
        <div className="col-span-full pt-6 ">
          <Title order={2} className="font-heading font-medium mb-6">
            Completed bookings
          </Title>
          <Table style={{ marginTop: "2rem" }} className="w-full">
            <Table.Header>
              <Table.Row>
                <Table.Head>Client</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Environment</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Time</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {bookings.map((_, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      <Skeleton rounded animate className="h-3 ww-full" />{" "}
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />{" "}
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton rounded animate className="h-3 ww-full" />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Grid>
    </>
  );
}
