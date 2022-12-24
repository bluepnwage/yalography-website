import { Badge, Card, FlexContainer, Title } from "@components/shared";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { capitalize } from "@util/capitalize";
import { Button } from "@components/shared/client";

type PropTypes = {
  status: "pending" | "approved";
  bookings: any[];
};

export function BookingsCard({ status, bookings }: PropTypes) {
  return (
    <Card style={{ padding: 0 }} className="col-span-6 w-full p-0 overflow-hidden">
      <header className="bg-slate-200 dark:bg-zinc-700 p-4">
        <Title size={"xl"} order={"h2"}>
          {capitalize(status)} Reservations
        </Title>
      </header>
      <ScrollAreaDemo orientation="vertical" height={500} className="flex flex-col gap-5">
        {bookings.map((_, key) => {
          return (
            <div
              key={key}
              className="border-b border-gray-300 dark:border-gray-600 -mx-4 mb-5 px-4 pb-4 last-of-type:mb-0 last-of-type:border-none flex flex-col justify-between gap-5"
            >
              <FlexContainer className="justify-between w-full">
                <div>
                  <p>Agis Carty</p>
                  <time className="font-semibold text-gray-500 dark:text-gray-200">21/07/2022, 13:00h</time>
                </div>
                <Badge className="inline-block">Marriage</Badge>
              </FlexContainer>
              <FlexContainer className="justify-between grow">
                <Button component="a" href={`/admin/reservations/${status}/3`} intent={"primary"}>
                  View details
                </Button>
              </FlexContainer>
            </div>
          );
        })}
      </ScrollAreaDemo>
    </Card>
  );
}
