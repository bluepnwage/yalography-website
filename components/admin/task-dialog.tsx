"use client";
//Components
import { Dialog, Button, Select, Textarea, TextInput, Popover, Calendar } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

//Hooks
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";

import { useState, type FormEvent } from "react";
import type { SerializedTaskList, SerializedTask } from "@/lib/prisma";
import type { DialogProps } from "@aomdev/ui";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { formatDate } from "@/util/formate-date";

type PropTypes = {
  taskLists: (SerializedTaskList & { tasks: SerializedTask[] })[];
  dialogProps: DialogProps;
};

export function TaskDialog({ taskLists, dialogProps }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [date, setDate] = useState<Date>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      name: formData.task_name,
      description: formData.description,
      deadline: date || null,
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
        setDate(undefined);
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
  return (
    <>
      <Dialog {...dialogProps}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title>Create New Task</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <TextInput autoFocus required name="task_name" label="Task Name" />
            <div className="space-y-1 ">
              <span className="font-medium block text-gray-100">Deadline</span>
              <Popover>
                <Popover.Trigger asChild>
                  <button className={inputStyles({ className: "w-full text-start px-2" })}>
                    {!date ? "Select date" : formatDate(date)}
                  </button>
                </Popover.Trigger>
                <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                  <Calendar
                    labelContentProps={{ className: "z-[9999]" }}
                    // disabled={{ before: new Date() }}
                    mode="single"
                    onSelect={setDate}
                    selected={date}
                  />
                </Popover.Content>
              </Popover>
            </div>
            <div className="flex gap-2">
              <div className="space-y-1 grow basis-1/2">
                <span className="text-gray-100 font-medium block">Priority</span>

                <Select
                  fullWidth
                  contentProps={{ className: "z-[9999]" }}
                  defaultValue="low"
                  name="priority"
                  items={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" }
                  ]}
                />
              </div>
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
