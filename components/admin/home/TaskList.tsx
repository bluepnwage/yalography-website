import { Todo } from "./Todo";
import { Card, Title } from "@components/shared";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { handlePromise } from "@util/handle-promise";
import prisma from "@lib/prisma";

async function getLists() {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany();
  await prisma.$disconnect();
  return tasks.map((task) => ({
    ...task,
    updatedAt: task.updatedAt.toDateString(),
    createdAt: task.createdAt.toDateString(),
    deadline: task?.deadline?.toDateString()
  }));
}

export async function TaskList() {
  const [data, error] = await handlePromise(getLists());
  if (!data || error) return;
  return (
    <>
      <Card className="col-span-8">
        <Title order={"h3"} className="text-center">
          Tasks
        </Title>
        <ScrollAreaDemo height={540} orientation={"vertical"}>
          <Todo tasks={data} />
        </ScrollAreaDemo>
      </Card>
    </>
  );
}

export function TaskListLoading() {
  return (
    <Card className="col-span-8">
      <Title order={"h3"} className="text-center">
        Tasks
      </Title>
      <TodoLoading />
    </Card>
  );
}

function TodoLoading() {
  const list = Array(5).fill(null);

  return (
    <>
      {list.map((_, key) => {
        return <Task key={key} />;
      })}
    </>
  );
}

function Task() {
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-2 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0">
      <div className="space-y-4">
        <div className="grayscale bg-red-600 h-4 w-48 rounded-xl animate-pulse"></div>
        <div className="grayscale bg-red-600 h-4 w-48 rounded-xl animate-pulse"></div>
      </div>
      <div className="h-10 w-24 grayscale bg-red-600 rounded-md animate-pulse"></div>
    </div>
  );
}
