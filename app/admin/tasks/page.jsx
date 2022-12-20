import { Title, Grid } from "@components/shared";
import { Suspense } from "react";
import { PinedLists, PinnedListsLoading } from "./PinnedList";
import { TaskLists, TaskListsLoading } from "./TaskList";
import { Tasks, TasksLoading } from "./Tasks";

export const revalidate = 0;

export default function TasksPage() {
  return (
    <>
      <Title order={"h2"} className="mb-5">
        Pinned Lists
      </Title>
      <Grid fullWidth className="mb-20">
        <PinnedListsLoading />
        {/* <Suspense fallback={<PinnedListsLoading />}>
          <PinedLists />
        </Suspense> */}
      </Grid>
      <Grid fullWidth>
        <TaskListsLoading />
        {/* <Suspense fallback={<TaskListsLoading />}>
          <TaskLists />
        </Suspense> */}
        {/* <TasksLoading /> */}
        <Suspense fallback={<TasksLoading />}>
          <Tasks />
        </Suspense>
      </Grid>
    </>
  );
}
