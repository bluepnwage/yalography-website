"use client";

import { useTasks } from "./TasksProvider";
import { Table } from "@components/shared/Table";
import { Badge } from "@components/shared/Badge";
import { cx } from "cva";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import type { SerializedTask } from "@lib/prisma";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActionIcon } from "@components/shared/ActionIcon";
import { Trash } from "@lib/icons";

export function Tasks() {
  const { tasks } = useTasks();

  return (
    <Table striped className="col-span-8 ">
      <thead className="border-b border-zinc-200 dark:border-zinc-700">
        <tr>
          <th className="py-2  border-r border-zinc-200 dark:border-zinc-700">Task name</th>
          <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Due date</th>
          <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Status</th>
          <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          return <TaskRow key={task.id} taskData={task} />;
        })}
      </tbody>
    </Table>
  );
}

type PropTypes = {
  taskData: SerializedTask;
};

function TaskRow({ taskData }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [task, setTask] = useState(taskData);
  const [isPending, refresh] = useRouteRefresh();

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
        toast.error("Failed to update task");
      }
    } finally {
      toggle.off();
    }
  };

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
        toast.success(json.message);
        refresh();
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

  const isLoading = isPending || loading;

  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700 last-of-type:border-0">
      <td className="py-2 space-x-2 text-start pl-2 ">
        <input
          disabled={isLoading}
          onChange={onStatusToggle}
          checked={task.status}
          id={`${task.id}-${task.name}`}
          type={"checkbox"}
          className="accent-emerald-600 disabled:cursor-not-allowed"
        />
        <label htmlFor={`${task.id}-${task.name}`}>{task.name}</label>
      </td>
      <td className="py-2 ">{task.deadline || "N/A"}</td>
      <td className="py-2 ">
        <Badge color={task.status ? "emerald" : "orange"} className={cx("px-2 w-fit mx-auto py-1 text-sm")}>
          {task.status ? "Complete" : "Incomplete"}
        </Badge>
      </td>
      <td>
        <Badge
          color={task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "emerald"}
          className="capitalize px-2 py-1 w-fit mx-auto text-sm"
        >
          {task.priority}
        </Badge>
      </td>
      <td>
        <ActionIcon
          disabled={isLoading}
          onClick={onDelete}
          aria-label="Delete task list"
          className="h-7 w-7 mx-auto inline-block"
        >
          <Trash size={16} className="stroke-red-200" />
        </ActionIcon>
      </td>
    </tr>
  );
}
