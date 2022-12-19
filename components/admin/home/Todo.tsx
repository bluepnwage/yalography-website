"use client";
import { Button } from "@components/shared/client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cx } from "cva";

import type { Tasks } from "@prisma/client";

type TaskList = Omit<Tasks, "updatedAt" | "createdAt" | "deadline"> & {
  updatedAt: string;
  createdAt: string;
  deadline: string | undefined;
};

type TodoProps = {
  tasks: TaskList[];
};

export function Todo({ tasks }: TodoProps) {
  const [isNavigating, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = async (todoId: number) => {
    const res = await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todoId })
    });
    if (res.ok) {
      startTransition(() => {
        router.refresh();
      });
    }
  };
  return (
    <>
      {tasks.length === 0 && (
        <div style={{ height: 400 }} className="flex justify-center items-center">
          <p className="text-2xl font-semibold">You don&apos;t have any tasks.</p>
        </div>
      )}
      {tasks.length > 0 &&
        tasks.map((task, key) => {
          return (
            <Task task={task} key={key}>
              {isNavigating && <p>Loading...</p>}
              <Button onClick={() => handleClick(task.id)} intent="secondary">
                Delete
              </Button>
            </Task>
          );
        })}
    </>
  );
}

type PropTypes = {
  children: React.ReactNode;
  task: TaskList;
};

function Task({ children, task }: PropTypes) {
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-2 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0">
      <div className="space-y-4">
        <p>
          {task.name}
          <span
            className={cx(
              "bg-opacity-50 rounded-full px-2 py-1 text-sm",
              task.status
                ? "text-emerald-700 dark:text-emerald-100 bg-emerald-200 dark:bg-emerald-500"
                : "text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-500"
            )}
          >
            {task.status ? "Completed" : "Not Completed"}
          </span>
        </p>
        <time className="text-gray-600 dark:text-gray-400">{task.createdAt}</time>
      </div>
      {children}
    </div>
  );
}
