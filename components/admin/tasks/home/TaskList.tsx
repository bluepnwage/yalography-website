"use client";
import { Card, Title, Skeleton } from "@components/shared";
import { Button } from "@components/shared/Button";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { Menu } from "@components/admin/tasks/home/ListMenu";
import { useTasks } from "./TasksProvider";

export function TaskLists() {
  const { taskLists } = useTasks();

  return (
    <Card style={{ padding: 0 }} className="col-span-7 overflow-hidden p-0">
      <div className="flex justify-between  p-2 bg-slate-200 dark:bg-zinc-700">
        <Title size={"xl"} order={"h2"}>
          Grouped tasks
        </Title>
        <Menu />
      </div>
      <ScrollAreaDemo height={300} orientation="vertical" className="">
        {taskLists.map((group) => {
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
