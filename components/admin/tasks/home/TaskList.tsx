"use client";
import { CreateList } from "./ListMenu";

import Link from "next/link";
import { Card, ActionIcon, ScrollArea, Button, TextInput, Dialog } from "@aomdev/ui";

import { useTasks } from "./TasksProvider";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";

import type { SerializedTask, SerializedTaskList } from "@/lib/prisma";
import type { FormEvent } from "react";
import { IconEdit, IconTrack, IconTrash, IconX } from "@tabler/icons-react";

export function TaskLists() {
  const { taskLists } = useTasks();

  return (
    <Card className=" col-span-4 overflow-hidden ">
      <Card.Section>
        <div className="flex justify-between px-5  py-2 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task lists</h2>
          <CreateList />
        </div>
      </Card.Section>
      <ScrollArea style={{ height: 300 }} className="w-full">
        {taskLists.map(list => {
          return <List key={list.id} list={list} />;
        })}
      </ScrollArea>
    </Card>
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

  const pending = list.tasks.filter(task => !task.status);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("task_list");
    toggle.on();
    const { toast } = await import("react-toastify");
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
      <Dialog open={dialog} onOpenChange={dialogToggle.set}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title>Edit task list</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            <TextInput label="Task list name" name="task_list" required defaultValue={list.name} />
            <Button className="block ml-auto" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>

      <div className="border-b py-2 -mx-4 px-5  border-zinc-200 dark:border-zinc-700 last-of-type:border-b-0">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-lg mb-2">{list.name}</p>
          <div className="flex gap-2 ">
            <ActionIcon
              onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              onClick={dialogToggle.on}
              aria-label="Edit task list"
              color="primary"
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon color="error" disabled={isLoading} onClick={onDelete} aria-label="Delete task list">
              <IconTrash size={16} />
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
