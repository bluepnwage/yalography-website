"use client";
import { DotsVertical } from "@/lib/icons";
import Link from "next/link";
import { Card, Dropdown } from "@aomdev/ui";
import { IconTrash, IconPin } from "@tabler/icons-react";

import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { useTasks } from "./TasksProvider";
import type { SerializedTask, SerializedTaskList } from "@/lib/prisma";

export function PinnedLists() {
  const { taskLists } = useTasks();
  const pinnedLists = taskLists.filter(list => list.pinned);
  return (
    <>
      {pinnedLists.map(list => {
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

  const pending = list.tasks.filter(task => !task.status);

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
    console.log(list);
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
    <Card className={`col-span-4 ${isLoading ? "opacity-50" : ""} `}>
      <div className="flex justify-between mb-5">
        <p className="font-medium text-lg">{list.name}</p>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <button>
              <DotsVertical size={16} />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item icon={<IconPin size={16} />} onClick={onPin}>
              {" "}
              Unpin list
            </Dropdown.Item>
            <Dropdown.Item color="error" icon={<IconTrash size={16} />} onClick={onDelete}>
              Delete list
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <p className="text-gray-300 mb-1">Pending tasks: {pending.length}</p>
      <p className="text-gray-300 mb-4">Total tasks: {list.tasks.length}</p>
      <Link className="text-yellow-600 dark:text-yellow-500" href={`/admin/tasks/${list.id}`}>
        View list
      </Link>
    </Card>
  );
}
