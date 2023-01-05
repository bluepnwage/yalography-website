"use client";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { TasksMenu } from "./TasksMenu";
import { Task } from "./Task";
import { useTasks } from "./TasksProvider";

export function Tasks() {
  const { tasks } = useTasks();
  return (
    <div className="col-span-5 dark:bg-zinc-800 rounded-md bg-white p-0 overflow-hidden">
      <div className="flex justify-between p-2 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">Tasks</h2>
        <TasksMenu />
      </div>
      <ScrollAreaDemo height={300} orientation={"vertical"}>
        {tasks.map((task, key) => {
          return <Task key={key} data={task} />;
        })}
      </ScrollAreaDemo>
    </div>
  );
}
