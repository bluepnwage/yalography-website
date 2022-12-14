import { Title, FlexContainer, Card, Button } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";

const tasks = Array(9).fill(null);

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
      {tasks.map((_, key) => {
        const date = new Date().toDateString();
        return (
          <Card key={key} className="mb-5 last-of-type:mb-0">
            <FlexContainer className="justify-between items-center mb-2 ">
              <FlexContainer className="items-center gap-2">
                <button aria-label="Complete task" className="rounded-full h-5 w-5 border border-gray-700"></button>
                <p>Eat food</p>
              </FlexContainer>
              <Button>Delete</Button>
            </FlexContainer>
            <p>Due: {date}</p>
          </Card>
        );
      })}
    </>
  );
}
