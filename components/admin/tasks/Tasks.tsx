"use client";
import { Card, Title, Skeleton } from "@components/shared";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { TasksMenu } from "@components/admin/tasks/TasksMenu";
import { Task } from "@components/admin/tasks/Task";
import { useTasks } from "./TasksProvider";

export function Tasks() {
  const { tasks } = useTasks();
  return (
    <Card style={{ padding: 0 }} className="col-span-5 p-0 overflow-hidden">
      <div className="dark:bg-zinc-700 bg-slate-200 flex justify-between p-2">
        <Title size={"xl"} order={"h2"}>
          Tasks
        </Title>
        <TasksMenu />
      </div>
      <ScrollAreaDemo height={300} orientation={"vertical"}>
        {tasks.map((task, key) => {
          return <Task key={key} data={task} />;
        })}
      </ScrollAreaDemo>
    </Card>
  );
}
