"use client";
import { Button } from "@components/shared/Button";
import { useState } from "react";
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
  const [list, setList] = useState<TaskList[]>(tasks);

  const filterList = (taskId: number) => {
    setList((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <>
      {list.length === 0 && (
        <div style={{ height: 400 }} className="flex justify-center items-center">
          <p className="text-2xl font-semibold">You don&apos;t have any tasks.</p>
        </div>
      )}
      {list.length > 0 &&
        list.map((task, key) => {
          return <Task task={task} key={key} onFilter={filterList} />;
        })}
    </>
  );
}

type PropTypes = {
  task: TaskList;
  onFilter: (taskId: number) => void;
};

function Task({ task, onFilter }: PropTypes) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id })
      });
      if (res.ok) {
        onFilter(task.id);
      } else {
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={cx(
        `flex justify-between border-b -mx-4 px-4 py-2 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0`,
        loading ? "animate-pulse" : ""
      )}
    >
      <div className="space-y-4">
        <p>
          {task.name}{" "}
          <span
            className={`bg-opacity-50 rounded-full px-2 py-1 text-sm text-gray-700 dark:text-gray-100
             bg-gray-200 dark:bg-gray-500`}
          >
            Incomplete
          </span>
        </p>
        <time className="text-gray-600 dark:text-gray-400">{task.createdAt}</time>
      </div>
      <Button onClick={handleClick} intent="reject">
        Delete
      </Button>
    </div>
  );
}
