"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GetTasks } from "app/admin/tasks/Tasks";
import { Button } from "@components/shared";
import { cx } from "cva";

type PropTypes = {
  task: GetTasks[0];
};

export function Task({ task }: PropTypes) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id })
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
  return (
    <div
      className={cx(
        "flex justify-between items-center border-b -mx-4 p-2  border-gray-300 dark:border-gray-600 last-of-type:border-b-0",
        isLoading ? "animate-pulse" : ""
      )}
    >
      <button
        aria-label={task.status ? "Uncheck task" : "Complete task"}
        className={cx("h-5 w-5 rounded-full border border-zinc-700", task.status ? "bg-emerald-500" : "")}
      ></button>
      <p>{task.name}</p>
      <Button onClick={onDelete} intent="secondary">
        Delete task
      </Button>
    </div>
  );
}
