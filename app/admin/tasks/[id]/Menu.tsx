"use client";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Trash, Pin, Plus } from "@lib/icons";
import dynamic from "next/dynamic";

import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import type { FormEvent } from "react";
import { DatePicker } from "@components/shared/DatePicker/DatePicker";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";

const Dialog = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));

type PropTypes = {
  groupId: number;
  pinned: boolean;
};

export function Menu({ groupId, pinned }: PropTypes) {
  const [opened, dialogToggle] = useToggle();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const router = useRouter();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
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
    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: groupId, pinned: !pinned })
      });
      if (res.ok) {
        refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const isLoading = loading || isPending;
  return (
    <>
      {lazyLoad && (
        <Dialog title="Create task" open={opened} onOpenChange={dialogToggle.set}>
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
      <Dropdown>
        <Dropdown.Trigger>
          <button>
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined} onClick={dialogToggle.on}>
            {" "}
            <Plus size={16} className="stroke-yellow-500 ring-1 ring-yellow-500 rounded-full inline-block mr-2" />
            Create task
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
