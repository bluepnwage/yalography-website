"use client";
import { Button } from "@components/shared/Button";

import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { toast } from "react-toastify";
import type { SerializedTask } from "./TaskList";

type PropTypes = {
  task: SerializedTask;
};
export function Task({ task }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

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

  const isLoading = loading || isPending;
  return (
    <div className={`bg-zinc-800 rounded-md p-4 mb-5 last-of-type:mb-0 ${isLoading ? "animate-pulse" : ""}`}>
      <div className="flex justify-between items-center mb-2 ">
        <div className="flex items-center gap-2">
          <button aria-label="Complete task" className="rounded-full h-5 w-5 border border-gray-700"></button>
          <p>{task.name}</p>
        </div>
        <Button disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
      </div>
      <p>Due: {task.deadline}</p>
    </div>
  );
}
