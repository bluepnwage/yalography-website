"use client";
import { Dropdown, Dialog, Select, Textarea, TextInput, Calendar, Popover, Button, Label } from "@aomdev/ui";
import { IconPlus, IconEdit, IconPin, IconTrash, IconDotsVertical } from "@tabler/icons-react";

import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouter } from "next/navigation";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";

import type { FormEvent } from "react";
import { cardStyles } from "@aomdev/ui/src/card/styles";

type PropTypes = {
  groupId: number;
  pinned: boolean;
  title: string;
};

export function Menu({ groupId, pinned, title }: PropTypes) {
  const [dialog, dialogToggle] = useToggle();
  const [renameDialog, renameToggle] = useToggle();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { toast } = await import("react-toastify");

    const data = {
      name: formData.task_name,
      description: formData.description,
      groupId,
      deadline: formData.deadline ? new Date(formData.deadline as string) : null,
      priority: formData.priority
    };
    toggle.on();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
        dialogToggle.off();
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
        body: JSON.stringify({ id: groupId })
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

  const onPin = async () => {
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: groupId, pinned: !pinned })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(pinned ? "Task list unpinned." : "Task list pinned.");
      } else {
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const onRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("task_name");
    toggle.on();

    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: groupId, name })
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

  const isLoading = loading || isPending;
  return (
    <>
      {lazyLoad && (
        <Dialog open={dialog} onOpenChange={dialogToggle.set}>
          <Dialog.Content className="w-1/4">
            <Dialog.Title>Create task</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
          <Dialog.Content>
            <Dialog.Title>Remane Task list</Dialog.Title>
            <form onSubmit={onRename} className="space-y-4 mt-6">
              <TextInput id="task_name" label="Name" required name="task_name" defaultValue={title} />
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
          <Dropdown.Item icon={<IconPlus size={16} />} onClick={dialogToggle.on}>
            {" "}
            Create task
          </Dropdown.Item>
          <Dropdown.Item icon={<IconEdit size={16} />} onClick={renameToggle.on}>
            Rename task list
          </Dropdown.Item>
          <Dropdown.Item icon={<IconPin size={16} />} onClick={onPin}>
            {pinned ? "Unpin task list" : "Pin task list"}
          </Dropdown.Item>
          <Dropdown.Item color="error" icon={<IconTrash size={16} />} onClick={onDelete}>
            Delete list
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
