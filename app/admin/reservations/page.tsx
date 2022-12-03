import { Grid, Title, Card, Section, FlexContainer, Button, Anchor, Badge } from "@components/shared";
import { ScrollAreaDemo } from "@components/shared/ScrollArea/ScrollArea";

const array = Array(9).fill(null);
import { ScheduleTracker } from "@components/admin/reservations/ScheduleTracker";
export default function ReservationPage() {
  return (
    <>
      <Title className="mb-10">Reservations</Title>
      <Section className="mb-20">
        <Card className="w-full flex flex-col justify-between">
          <ScheduleTracker />
        </Card>
      </Section>
      <Section>
        <Grid fullWidth>
          <Card style={{ padding: 0 }} className="col-span-6 w-full p-0 overflow-hidden">
            <header className="bg-red-600 p-4">
              <Title order={"h2"} className="text-gray-100">
                Pending Reservations
              </Title>
            </header>
            <ScrollAreaDemo orientation="vertical" height={500} className="flex flex-col gap-5">
              {array.map((_, key) => {
                return (
                  <div
                    key={key}
                    className="border-b border-gray-600 -mx-4 mb-5 px-4 pb-4 last-of-type:mb-0 last-of-type:border-none flex flex-col justify-between gap-5"
                  >
                    <FlexContainer className="justify-between w-full">
                      <div>
                        <p>Agis Carty</p>
                        <time>21/07/2022, 13:00h</time>
                      </div>
                      <Anchor href={"/admin/reservations/4"}>View details</Anchor>
                    </FlexContainer>
                    <FlexContainer className="justify-between grow">
                      <Badge className="mr-auto inline-block">Marriage</Badge>
                      <FlexContainer className="justify-between items-center ">
                        <Button intent="accept" className="h-fit">
                          Accept
                        </Button>
                        <Button intent="reject" className="h-fit">
                          Reject
                        </Button>
                      </FlexContainer>
                    </FlexContainer>
                  </div>
                );
              })}
            </ScrollAreaDemo>
          </Card>
          <Card style={{ padding: 0 }} className="col-span-6 overflow-hidden">
            <header className="bg-red-600  p-4">
              <Title order={"h2"}>Accepted Reservations</Title>
            </header>
            <ScrollAreaDemo orientation="vertical" height={500}>
              {array.map((_, key) => {
                return (
                  <div
                    key={key}
                    className="border-b border-gray-600 -mx-4 px-4 pb-4 last-of-type:border-none flex flex-col justify-between gap-5"
                  >
                    <FlexContainer className="justify-between w-full">
                      <div>
                        <p>Agis Carty</p>
                        <time>21/07/2022, 13:00h</time>
                      </div>
                      <Anchor href={"/admin/reservations/4"}>View details</Anchor>
                    </FlexContainer>
                    <FlexContainer className="justify-between grow">
                      <Badge className="mr-auto inline-block">Marriage</Badge>
                      <FlexContainer className="justify-between items-center ">
                        <Button intent="secondary" className="h-fit">
                          Cancel
                        </Button>
                      </FlexContainer>
                    </FlexContainer>
                  </div>
                );
              })}
            </ScrollAreaDemo>
          </Card>
        </Grid>
      </Section>
    </>
  );
}
