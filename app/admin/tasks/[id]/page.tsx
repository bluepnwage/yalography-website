import { Title, FlexContainer } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { TaskList } from "./TaskList";

export default function TaskListPage() {
  return (
    <>
      <FlexContainer className="justify-between mb-20">
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
