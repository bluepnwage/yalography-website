import { Title, Card, Button, Grid } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { DotsVertical } from "@lib/icons";

const pinnedCards = Array(3).fill(null);
const tasks = Array(30).fill(null);
const groupedTasks = Array(30).fill(null);

export default function TasksPage() {
  return (
    <>
      <Title order={"h2"} className="mb-5">
        Pinned Lists
      </Title>
      <Grid fullWidth className="mb-20">
        {pinnedCards.map((_, key) => {
          return (
            <Card key={key} className="col-span-4">
              <div className="flex justify-between mb-5">
                <p className="font-semibold text-lg">Wedding 2019</p>
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <button>
                      <DotsVertical size={16} />
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>Delete</Dropdown.Item>
                    <Dropdown.Item>Unpin</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Root>
              </div>
              <p className="text-gray-400">Pending tasks: 3</p>
              <p className="text-gray-400">Total tasks: 5</p>
            </Card>
          );
        })}
      </Grid>
      <Grid fullWidth>
        <Card style={{ padding: 0 }} className="col-span-7 overflow-hidden p-0">
          <div className="flex justify-between  p-2 bg-slate-200 dark:bg-zinc-700">
            <Title size={"xl"} order={"h2"}>
              Grouped tasks
            </Title>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <button>
                  <DotsVertical size={16} />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>Create list</Dropdown.Item>
                <Dropdown.Item>Sort by</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
          <ScrollAreaDemo height={300} orientation="vertical" className="">
            {groupedTasks.map((_, key) => {
              return (
                <div
                  key={key}
                  className="flex justify-between border-b py-2 -mx-4 px-2 items-center border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
                >
                  <div>
                    <p className="font-semibold text-lg">Wedding 2019</p>
                    <p>21/07/2022</p>
                  </div>
                  <Button className="h-fit">View list</Button>
                </div>
              );
            })}
          </ScrollAreaDemo>
        </Card>
        <Card style={{ padding: 0 }} className="col-span-5 p-0 overflow-hidden">
          <div className="dark:bg-zinc-700 bg-slate-200 flex justify-between p-2">
            <Title size={"xl"} order={"h2"}>
              Tasks
            </Title>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <button>
                  <DotsVertical size={16} />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>Create task</Dropdown.Item>
                <Dropdown.Item>Sort by</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
          <ScrollAreaDemo height={300} orientation={"vertical"}>
            {tasks.map((_, key) => {
              return (
                <div
                  key={key}
                  className="flex justify-between items-center border-b -mx-4 p-2  border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
                >
                  <button className="h-5 w-5 rounded-full border border-zinc-700"></button>
                  <p>Edit photos</p>
                  <Button intent="secondary">Delete task</Button>
                </div>
              );
            })}
          </ScrollAreaDemo>
        </Card>
      </Grid>
    </>
  );
}
