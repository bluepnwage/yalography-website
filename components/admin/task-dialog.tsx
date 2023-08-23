"use client";
//Components
import { Dialog, Button, Select, Textarea, TextInput } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

//Hooks
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";

import type { FormEvent } from "react";
import type { SerializedTaskList, SerializedTask } from "@/lib/prisma";
import type { DialogProps } from "@aomdev/ui";

type PropTypes = {
  taskLists: (SerializedTaskList & { tasks: SerializedTask[] })[];
  dialogProps: DialogProps;
};

export function TaskDialog({ taskLists, dialogProps }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      name: formData.task_name,
      description: formData.description,
      groupId: parseInt(formData.task_list as string) || null,
      deadline: formData.deadline ? new Date(formData.deadline as string) : null,
      priority: formData.priority
    };
    toggle.on();
    const { toast } = await import("react-toastify");

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
        if (dialogProps.onOpenChange) dialogProps.onOpenChange(false);
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
  const selectData = taskLists.map(list => ({ label: list.name, value: `${list.id}` }));
  return (
    <>
      <Dialog {...dialogProps}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title>Create new task</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <TextInput autoFocus required name="task_name" label="Task Name" />
            {/* <DatePicker id="deadline" minDate={new Date()} label="Deadline" name="deadline" /> */}
            <div className="flex gap-2">
              <Select name="task_list" disabled={selectData.length === 0} items={selectData} />
              <Select
                defaultValue="low"
                name="priority"
                items={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" }
                ]}
              />
            </div>
            <Textarea name="description" label="Description" />
            <Button disabled={isLoading} className="block ml-auto">
              Submit
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
