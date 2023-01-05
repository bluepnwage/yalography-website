"use client";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { Edit, Trash } from "@lib/icons";
import { ActionIcon } from "@components/shared/ActionIcon";
import { CreateList } from "./ListMenu";
import { Input } from "@components/shared/Input";
import { Button } from "@components/shared/Button";
import Link from "next/link";

import { useTasks } from "./TasksProvider";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import type { SerializedTask, SerializedTaskList } from "@lib/prisma";
import type { FormEvent } from "react";

const DialogDemo = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.DialogDemo));

export function TaskLists() {
  const { taskLists } = useTasks();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-md col-span-4 overflow-hidden ">
      <div className="flex justify-between px-5  py-2 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task lists</h2>
        <CreateList />
      </div>
      <ScrollAreaDemo height={300} orientation="vertical" className="">
        {taskLists.map((list) => {
          return <List key={list.id} list={list} />;
        })}
      </ScrollAreaDemo>
    </div>
  );
}

type PropTypes = {
  list: SerializedTaskList & { tasks: SerializedTask[] };
};

function List({ list }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

  const pending = list.tasks.filter((task) => !task.status);

  const onDelete = async () => {
    toggle.on();
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("task_list");
    toggle.on();
    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: list.id, name })
      });
      const json = await res.json();
      if (res.ok) {
        dialogToggle.off();
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
    <>
      {lazyLoad && (
        <DialogDemo title="Edit task list" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={onSubmit} className="space-y-2">
            <Input label="Task list name" name="task_list" required defaultValue={list.name} />
            <Button disabled={isLoading} intent="accept">
              Submit
            </Button>
          </form>
        </DialogDemo>
      )}
      <div className="border-b py-2 -mx-4 px-5  border-zinc-200 dark:border-zinc-700 last-of-type:border-b-0">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-lg mb-2">{list.name}</p>
          <div className="flex gap-2 ">
            <ActionIcon
              onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              onClick={dialogToggle.on}
              aria-label="Edit task list"
              className="h-7 w-7"
              color="indigo"
            >
              <Edit size={16} className="stroke-indigo-200" />
            </ActionIcon>
            <ActionIcon disabled={isLoading} onClick={onDelete} aria-label="Delete task list" className="h-7 w-7">
              <Trash size={16} className="stroke-red-200" />
            </ActionIcon>
          </div>
        </div>
        <div className="flex justify-between">
          <Link className="text-yellow-600 dark:text-yellow-500" href={`/admin/tasks/${list.id}`}>
            View list
          </Link>
          <p className="text-gray-500 dark:text-gray-400">Pending tasks: {pending.length}</p>
        </div>
      </div>
    </>
  );
}
