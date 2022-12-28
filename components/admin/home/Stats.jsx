import { Grid } from "@components/shared";
import { TaskList, TaskListLoading } from "./TaskList";
import { Suspense } from "react";
import { ChartContainer, ChartLoading } from "./ChartContainer";

export function Stats() {
  return (
    <>
      <Grid fullWidth>
        <Suspense fallback={<ChartLoading />}>
          <ChartContainer />
        </Suspense>
        <Suspense fallback={<TaskListLoading />}>
          <TaskList />
        </Suspense>
      </Grid>
    </>
  );
}
