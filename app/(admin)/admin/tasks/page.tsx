import { Grid } from "@/components/shared";
import { PinnedLists } from "@/components/admin/tasks/home/PinnedList";
import { TaskLists } from "@/components/admin/tasks/home/TaskList";
import { Tasks } from "@/components/admin/tasks/home/Tasks";
import { Title } from "@aomdev/ui";

export const revalidate = 0;

export default function TasksPage() {
  return (
    <>
      <Title order={2} className="mb-5 font-heading font-medium ">
        Pinned Lists
      </Title>
      <Grid fullWidth className="mb-20">
        <PinnedLists />
      </Grid>
      <Grid fullWidth>
        <TaskLists />
        <Tasks />
      </Grid>
    </>
  );
}
