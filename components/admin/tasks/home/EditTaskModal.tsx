"use client";
import { Button } from "@/components/shared/Button";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker";
import { Dialog } from "@/components/shared/Dialog";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";

import { useTasks } from "./TasksProvider";
import { useToggle } from "@/lib/hooks/useToggle";

import type { SerializedTask } from "@/lib/prisma";
import type { FormEvent } from "react";
import type { EditTaskData } from "./Tasks";
import type { TaskPriority } from "@prisma/client";

type PropTypes = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  task: SerializedTask;
  onEdit: (data: EditTaskData) => void;
};

export function EditTaskModal({ onOpenChange, open, task, onEdit }: PropTypes) {
  const { taskLists } = useTasks();
  const [loading, toggle] = useToggle();
  const selectData = taskLists.map(list => ({ label: list.name, value: `${list.id}` }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      id: task.id,
      name: formData.task_name as string,
      description: formData.description as string,
      groupId: parseInt(formData.task_list as string) || null,
      deadline: formData.deadline ? new Date(formData.deadline as string) : null,
      priority: formData.priority as TaskPriority
    };
    toggle.on();
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
        onEdit({ ...data, deadline: data.deadline?.toDateString() || "" });
        onOpenChange(false);
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

  const isLoading = loading;
  return (
    <Dialog title="Edit task" open={open} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input required name="task_name" label="Task Name" defaultValue={task.name} />
          <DatePicker
            defaultValue={task.deadline ? new Date(task.deadline) : null}
            id="deadline"
            minDate={new Date()}
            label="Deadline"
            name="deadline"
          />
          <div className="flex gap-2">
            <Select
              defaultValue={`${task.groupId || ""}`}
              className="grow basis-1/2"
              label="Add to task list"
              name="task_list"
              data={selectData}
            />
            <Select
              defaultValue={task.priority}
              className="grow basis-1/2"
              label="Priority"
              name="priority"
              data={[
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" }
              ]}
            />
          </div>
          <Textarea defaultValue={task.description || ""} name="description" label="Description" />
          <Button disabled={isLoading} intent={"accept"}>
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
