import { Grid } from "@components/shared";
import { TaskList, TaskListLoading } from "./TaskList";
import { Suspense } from "react";
import { ChartContainer, ChartLoading } from "./ChartContainer";
import { TableContainer, TableLoading } from "./TableContainer";

export function Stats() {
  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <TableContainer />
      </Suspense>
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
