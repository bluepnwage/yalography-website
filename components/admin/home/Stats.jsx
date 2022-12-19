import { Chart } from "./Chart";
import { Section, Grid, Card, Title } from "@components/shared";
import { TaskList, TaskListLoading } from "./TaskList";
import { Suspense } from "react";

export function Stats() {
  return (
    <Section>
      <Grid fullWidth>
        <Card className="col-span-4 text-center flex flex-col">
          <Title order={"h3"}>Reservations</Title>
          <Chart />
        </Card>
        {/* <TaskListLoading /> */}
        <Suspense fallback={<TaskListLoading />}>
          <TaskList />
        </Suspense>
      </Grid>
    </Section>
  );
}
