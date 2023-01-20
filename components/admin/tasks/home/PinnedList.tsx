"use client";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical, Trash, Pin } from "@lib/icons";
import Link from "next/link";

import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useTasks } from "./TasksProvider";

import type { SerializedTask, SerializedTaskList } from "@lib/prisma";

export function PinnedLists() {
  const { taskLists } = useTasks();
  const pinnedLists = taskLists.filter((list) => list.pinned);
  return (
    <>
      {pinnedLists.map((list) => {
        return <PinnedTaskList key={list.id} list={list} />;
      })}
    </>
  );
}

type PropTypes = {
  list: SerializedTaskList & { tasks: SerializedTask[] };
};

function PinnedTaskList({ list }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();

  const pending = list.tasks.filter((task) => !task.status);

  const onPin = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: list.id, pinned: !list.pinned })
      });
      const json = await res.json();
      if (res.ok) {
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

  const onDelete = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/task-list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: list.id })
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
    <div className={`col-span-4 rounded-md bg-white p-4 dark:bg-zinc-800 ${isLoading ? "animate-pulse" : ""} `}>
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-lg">{list.name}</p>
        <Dropdown>
          <Dropdown.Trigger>
            <button>
              <DotsVertical size={16} />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={onPin}>
              {" "}
              <Pin size={16} className="stroke-yellow-500 inline-block mr-2" />
              Unpin list
            </Dropdown.Item>
            <Dropdown.Item onClick={onDelete}>
              <Trash size={16} className="stroke-yellow-500 mr-2" /> Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <p className="text-gray-400">Pending tasks: {pending.length}</p>
      <p className="text-gray-400">Total tasks: {list.tasks.length}</p>
      <Link className="text-yellow-600 dark:text-yellow-500" href={`/admin/tasks/${list.id}`}>
        View list
      </Link>
    </div>
  );
}
