"use client";
import {
  Dropdown,
  Dialog,
  Select,
  Textarea,
  TextInput,
  Calendar,
  Popover,
  Button,
  Label,
  ActionIcon
} from "@aomdev/ui";
import { IconEdit, IconTrash, IconDotsVertical, IconStar, IconX, IconStarFilled } from "@tabler/icons-react";

import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouter } from "next/navigation";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";

import { useState, type FormEvent } from "react";
import { cardStyles } from "@aomdev/ui/src/card/styles";

type PropTypes = {
  id: number;
  name: string;
  defaultPinned: boolean;
};

export function TaskMenu({ id, name, defaultPinned }: PropTypes) {
  const [dialog, dialogToggle] = useToggle();
  const [renameDialog, renameToggle] = useToggle();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [pinned, setPinned] = useState(defaultPinned);
  const router = useRouter();

  const onDelete = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
        refresh();
        router.push("/admin/tasks");
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

  const onRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("task_name");
    toggle.on();

    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name })
      });
      if (res.ok) {
        refresh();
        renameToggle.off();
      } else {
        throw new Error("Failed to rename task list.");
      }
    } catch (error) {
      const { toast } = await import("react-toastify");

      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onPin = async () => {
    setPinned(prev => !prev);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pinned: !pinned })
    });
    if (!res.ok) {
      setPinned(pinned);
    }
  };

  const isLoading = loading || isPending;
  return (
    <div className="flex items-center gap-2 ">
      <ActionIcon onClick={onPin} variant={"subtle"} color="secondary">
        {pinned ? <IconStarFilled size={16} /> : <IconStar size={16} />}
      </ActionIcon>
      {lazyLoad && (
        <Dialog open={dialog} onOpenChange={dialogToggle.set}>
          <Dialog.Content className="w-1/4">
            <Dialog.Title>Create task</Dialog.Title>

            <form className="space-y-4 mt-6">
              <TextInput required name="task_name" label="Task Name" />
              <div className="space-y-1">
                <Label htmlFor="date">Due Date</Label>
                <Popover>
                  <Popover.Trigger asChild>
                    <button className={inputStyles({ className: "w-full" })}></button>
                  </Popover.Trigger>
                  <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                    <Calendar mode="single" />
                    <input hidden type="date" name="date" id="date" />
                  </Popover.Content>
                </Popover>
              </div>
              <Select
                fullWidth
                defaultValue="low"
                name="priority"
                items={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" }
                ]}
              />
              <Textarea name="description" label="Description" />
              <Button disabled={isLoading} className="block ml-auto">
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      {lazyLoad && (
        <Dialog open={renameDialog} onOpenChange={renameToggle.set}>
          <Dialog.Content className="w-1/4">
            <div className="flex items-center justify-between">
              <Dialog.Title>Rename Task list</Dialog.Title>
              <Dialog.Close>
                <IconX size={"75%"} />
              </Dialog.Close>
            </div>
            <form onSubmit={onRename} className="space-y-4 mt-6">
              <TextInput id="task_name" label="Name" required name="task_name" defaultValue={name} />
              <Button disabled={isLoading} className="block ml-auto">
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      <Dropdown>
        <Dropdown.Trigger asChild onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
          <button>
            <IconDotsVertical size={16} />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item icon={<IconEdit size={16} />} onClick={renameToggle.on}>
            Rename task
          </Dropdown.Item>

          <Dropdown.Item color="error" icon={<IconTrash size={16} />} onClick={onDelete}>
            Delete Task
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
