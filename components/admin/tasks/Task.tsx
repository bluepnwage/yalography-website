"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/shared/client";
import { cx } from "cva";

import type { GetTasks } from "app/admin/tasks/Tasks";

type PropTypes = {
  data: GetTasks[0];
};

export function Task({ data }: PropTypes) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [task, setTask] = useState(data);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.id })
      });
      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("WTF");
    } finally {
      setLoading(false);
    }
  };
  const isLoading = isPending || loading;

  const onToggleCheck = async () => {
    const prevTask = task;
    setTask((prev) => ({ ...prev, status: !prev.status }));
    try {
      const res = await fetch("/api/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.id, data: { status: !data.status } })
      });
      if (!res.ok) {
        setTask(prevTask);
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
      console.error("WTF!!", error);
    }
  };

  return (
    <div
      className={cx(
        "flex justify-between items-center border-b -mx-4 p-2  border-gray-300 dark:border-gray-600 last-of-type:border-b-0",
        isLoading ? "animate-pulse" : ""
      )}
    >
      <div className="basis-2/3 flex  items-center gap-4">
        <button
          onClick={onToggleCheck}
          style={{ maxHeight: 20, maxWidth: 20, minWidth: 20, minHeight: 20 }}
          aria-label={task.status ? "Uncheck task" : "Complete task"}
          className={cx("self-center rounded-full border border-zinc-700", task.status ? "bg-emerald-500" : "")}
        ></button>
        <p>{task.name}</p>
      </div>

      <Button onClick={onDelete} intent="secondary">
        Delete task
      </Button>
    </div>
  );
}
