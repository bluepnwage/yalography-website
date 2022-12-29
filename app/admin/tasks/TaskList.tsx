import { Card, Title, Skeleton } from "@components/shared";
import { Button } from "@components/shared/Button";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { Menu } from "@components/admin/tasks/ListMenu";

import prisma from "@lib/prisma";

async function getTaskLists() {
  await prisma.$connect();
  const data = await prisma.taskLists.findMany();
  await prisma.$disconnect();
  return data.map((group) => {
    return {
      ...group,
      createdAt: group.createdAt.toDateString(),
      updatedAt: group.updatedAt.toDateString()
    };
  });
}

export async function TaskLists() {
  const groupedTasks = await getTaskLists();

  return (
    <Card style={{ padding: 0 }} className="col-span-7 overflow-hidden p-0">
      <div className="flex justify-between  p-2 bg-slate-200 dark:bg-zinc-700">
        <Title size={"xl"} order={"h2"}>
          Grouped tasks
        </Title>
        <Menu />
      </div>
      <ScrollAreaDemo height={300} orientation="vertical" className="">
        {groupedTasks.map((group) => {
          return (
            <div
              key={group.id}
              className="flex justify-between border-b py-2 -mx-4 px-2 items-center border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
            >
              <div>
                <p className="font-semibold text-lg">{group.name}</p>
                <p>{group.createdAt}</p>
              </div>
              <Button component="a" href={`/admin/tasks/${group.id}`} className="h-fit">
                View list
              </Button>
            </div>
          );
        })}
      </ScrollAreaDemo>
    </Card>
  );
}

export function TaskListsLoading() {
  const groupedTasks = Array(5).fill(null);
  return (
    <Card className="col-span-7 relative overflow-hidden p-0">
      <Skeleton.Shimmer />
      <div className="flex justify-between items-center -mx-4 -mt-4 p-2  bg-slate-200 dark:bg-zinc-700">
        <Skeleton className="h-7 w-28" />
        <Skeleton radius={"full"} className="w-3 h-7" />
      </div>
      {groupedTasks.map((_, key) => {
        return (
          <div
            key={key}
            className="flex justify-between border-b py-4 -mx-4 px-2 items-center border-gray-300 dark:border-gray-600 last-of-type:border-b-0"
          >
            <div className="space-y-2">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="w-16 h-8" />
          </div>
        );
      })}
    </Card>
  );
}
