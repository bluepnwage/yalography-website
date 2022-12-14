"use client";
import { ActionIcon } from "@components/shared/ActionIcon";
import { Trash } from "@lib/icons";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { toast } from "react-toastify";
import { useState } from "react";
import type { SerializedTask } from "./TaskList";
import { Badge } from "@components/shared/Badge";

type PropTypes = {
  taskData: SerializedTask;
};
export function Task({ taskData }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [task, setTask] = useState(taskData);

  const onDelete = async () => {
    toggle.on();
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
      } else {
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onStatusToggle = async () => {
    toggle.on();
    const lastStatus = task.status;
    setTask((prev) => ({ ...prev, status: !prev.status }));
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: !task.status })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
      } else {
        setTask((prev) => ({ ...prev, status: lastStatus }));
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const isLoading = loading || isPending;
  return (
    <div
      className={`bg-white dark:bg-zinc-800 rounded-md p-4 mb-5 last-of-type:mb-0 ${isLoading ? "animate-pulse" : ""}`}
    >
      <div className="flex justify-between items-center mb-2 ">
        <div className="flex gap-2 items-center">
          <p className="flex items-center gap-2">
            <input
              onChange={onStatusToggle}
              id={`${task.id}-${task.name}`}
              type={"checkbox"}
              className="accent-emerald-600"
              checked={task.status}
            />
            <label htmlFor={`${task.id}-${task.name}`}>{task.name}</label>
          </p>
          <Badge
            color={task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "emerald"}
            className="capitalize px-2 py-1 w-fit text-sm"
          >
            {task.priority} priority
          </Badge>
        </div>
        <ActionIcon onClick={onDelete} disabled={isLoading} className="w-7 h-7" aria-label="Delete task">
          <Trash size={16} className="stroke-red-600 dark:stroke-red-200" />
        </ActionIcon>
      </div>
      <p>Due: {task.deadline}</p>
      <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
    </div>
  );
}
