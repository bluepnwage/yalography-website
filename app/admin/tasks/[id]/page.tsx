import { Title, FlexContainer, Breadcrumbs, Anchor } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { TaskList } from "./TaskList";

export default function TaskListPage() {
  return (
    <>
      <Breadcrumbs>
        <Anchor href="/admin/tasks">Tasks</Anchor>
        <Anchor href="/admin/random-task-list">Random task list</Anchor>
      </Breadcrumbs>
      <FlexContainer className="justify-between mb-20 mt-5">
        <Title>Random task list</Title>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button>
              <DotsVertical />
            </button>
          </Dropdown.Trigger>
        </Dropdown.Root>
      </FlexContainer>
      <TaskList />
    </>
  );
}
