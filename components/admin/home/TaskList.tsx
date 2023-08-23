import { Todo } from "./Todo";
import { Card, Skeleton, Title } from "@/components/shared";
import { ScrollAreaDemo } from "@/components/shared/ScrollArea";

import prisma from "@/lib/prisma";

async function getIncompleteTasks() {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany({ take: 15, where: { status: false } });
  await prisma.$disconnect();
  return tasks.map(task => ({
    ...task,
    updatedAt: task.updatedAt.toDateString(),
    createdAt: task.createdAt.toDateString(),
    deadline: task?.deadline?.toDateString()
  }));
}

export async function TaskList() {
  const data = await getIncompleteTasks();
  return (
    <>
      <Card className="col-span-8">
        <Title order={"h3"} className="text-center">
          Incomplete Tasks
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
    <Card className="col-span-8 relative overflow-hidden">
      <Skeleton.Shimmer />
      <div className="flex justify-center">
        <Skeleton className="h-6 w-36" />
      </div>
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
    <div className="flex justify-between border-b -mx-4 px-4 py-4 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0">
      <div className="space-y-2">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
