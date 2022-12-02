import { Chart } from "./Chart";
import { Section, Grid, Card, Title } from "@components/shared";
import { Todo } from "./Todo";

export function Stats() {
  return (
    <Section>
      <Grid className="w-full">
        <Card className="col-span-4 text-center flex flex-col">
          <Title order={"h3"}>Reservations</Title>
          <Chart />
        </Card>
        <Card style={{ maxHeight: "540px" }} className="col-span-8 overflow-y-scroll">
          <Title order={"h3"}>Tasks</Title>
          <Todo />
        </Card>
      </Grid>
    </Section>
  );
}
