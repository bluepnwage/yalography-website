"use client";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical, Edit } from "@lib/icons";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Trash, Pin, Plus } from "@lib/icons";
import dynamic from "next/dynamic";

import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouter } from "next/navigation";

import type { FormEvent } from "react";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";

const Dialog = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));
const DatePicker = dynamic(() => import("@components/shared/DatePicker/DatePicker").then((mod) => mod.DatePicker));

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
        <Dialog title="Create task" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input required name="task_name" label="Task Name" />
            <DatePicker id="deadline" minDate={new Date()} label="Deadline" name="deadline" />
            <Select
              defaultValue="low"
              className="grow basis-1/2"
              label="Priority"
              name="priority"
              data={[
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" }
              ]}
            />
            <Textarea name="description" label="Description" />
            <Button disabled={isLoading} intent={"accept"}>
              Submit
            </Button>
          </form>
        </Dialog>
      )}
      {lazyLoad && (
        <Dialog open={renameDialog} onOpenChange={renameToggle.set} title="Rename task list">
          <form onSubmit={onRename} className="space-y-4">
            <Input id="task_name" label="Name" required name="task_name" defaultValue={title} />
            <Button disabled={isLoading} intent={"accept"}>
              Submit
            </Button>
          </form>
        </Dialog>
      )}
      <Dropdown>
        <Dropdown.Trigger>
          <button>
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content side="left">
          <Dropdown.Item onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined} onClick={dialogToggle.on}>
            {" "}
            <Plus size={16} className="stroke-yellow-500 ring-1 ring-yellow-500 rounded-full inline-block mr-2" />
            Create task
          </Dropdown.Item>
          <Dropdown.Item onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined} onClick={renameToggle.on}>
            <Edit size={16} className="stroke-yellow-600 dark:stroke-yellow-500 inline-block mr-2" />
            Rename task list
          </Dropdown.Item>
          <Dropdown.Item onClick={onPin}>
            <Pin size={16} className="stroke-yellow-500  inline-block mr-2" />
            {pinned ? "Unpin task list" : "Pin task list"}
          </Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>
            <Trash size={16} className="stroke-yellow-500 inline-block mr-2" />
            Delete list
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
