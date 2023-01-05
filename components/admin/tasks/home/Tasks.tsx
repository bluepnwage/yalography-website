"use client";

import { useTasks } from "./TasksProvider";
import { Table } from "@components/shared/Table";
import { Badge } from "@components/shared/Badge";
import { cx } from "cva";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { SerializedTask } from "@lib/prisma";
import { useState } from "react";
import { toast } from "react-toastify";

export function Tasks() {
  const { tasks } = useTasks();

  return (
    <Table striped className="col-span-full ">
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
      const res = await fetch("/api/todo", {
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
      const res = await fetch("/api/todo", {
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
        <button
          onClick={onDelete}
          disabled={isLoading}
          className="disabled:grayscale disabled:cursor-not-allowed rounded-md relative active:top-[2px] inline-block mx-auto bg-red-600/40 h-7 w-7 flex items-center justify-center"
          aria-label="Delete task"
        >
          <Trash />
        </button>
      </td>
    </tr>
  );
}

function Trash() {
  return (
    <svg height={16} width={16} className={"stroke-red-200"} viewBox="0 0 24 24" xmlns="http:www.w3.org/2000/svg">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </g>
    </svg>
  );
}
