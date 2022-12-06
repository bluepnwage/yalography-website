import { Chart } from "./Chart";
import { Section, Grid, Card, Title } from "@components/shared";
import { Todo } from "./Todo";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
export function Stats() {
  return (
    <Section>
      <Grid fullWidth>
        <Card className="col-span-4 text-center flex flex-col">
          <Title order={"h3"}>Reservations</Title>
          <Chart />
        </Card>
        <Card className="col-span-8">
          <Title order={"h3"} className="text-center">
            Tasks
          </Title>
          <ScrollAreaDemo height={540} orientation={"vertical"}>
            <Todo />
          </ScrollAreaDemo>
        </Card>
      </Grid>
    </Section>
  );
}
