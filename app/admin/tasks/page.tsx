import { Title, Grid } from "@components/shared";
import { PinedLists, PinnedListsLoading } from "./PinnedList";
import { TaskLists } from "@components/admin/tasks/TaskList";
import { Tasks } from "@components/admin/tasks/Tasks";

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
        <TaskLists />
        <Tasks />
      </Grid>
    </>
  );
}
