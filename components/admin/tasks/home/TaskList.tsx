"use client";
import { Button } from "@components/shared/Button";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { Menu } from "@components/admin/tasks/home/ListMenu";
import { useTasks } from "./TasksProvider";

export function TaskLists() {
  const { taskLists } = useTasks();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-md col-span-7 overflow-hidden ">
      <div className="flex justify-between  p-2 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task lists</h2>
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
    </div>
  );
}
