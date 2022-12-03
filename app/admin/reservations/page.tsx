import { Grid, Title, Card, Section, FlexContainer, Button, Anchor, Badge } from "@components/shared";
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
          <Card style={{ maxHeight: 500 }} className="col-span-6 space-y-5 overflow-y-scroll">
            <header className="bg-red-600 -mx-4 -mt-4 p-4">
              <Title order={"h2"}>Pending Reservations</Title>
            </header>

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
                      <Button className="h-fit">Accept</Button>
                      <Button intent="secondary" className="h-fit">
                        Reject
                      </Button>
                    </FlexContainer>
                  </FlexContainer>
                </div>
              );
            })}
          </Card>
          <Card style={{ maxHeight: 500 }} className="col-span-6 overflow-y-scroll space-y-5">
            <header className="bg-red-600 -mx-4 -mt-4 p-4">
              <Title order={"h2"}>Accepted Reservations</Title>
            </header>

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
          </Card>
        </Grid>
      </Section>
    </>
  );
}
