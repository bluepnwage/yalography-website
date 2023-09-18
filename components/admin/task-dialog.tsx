"use client";
//Components
import { Dialog, Select, Textarea, TextInput, Popover, Calendar } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

//Hooks
import { useState } from "react";
import type { DialogProps } from "@aomdev/ui";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { formatDate } from "@/util/formate-date";
import { createTask } from "./action";
import { SubmitButton } from "../submit-button";
import { useCommand } from "./command-provider";

type PropTypes = {
  dialogProps: DialogProps;
};

export function TaskDialog({ dialogProps }: PropTypes) {
  const [date, setDate] = useState<Date>();
  const { dispatch } = useCommand();

  const handleSubmit = async (form: FormData) => {
    const { toast } = await import("react-hot-toast");
    const data = await createTask(form, date || null);
    if (data.error) toast.error(data.message);
    toast.success("Task created");
    dispatch({ type: "dialog", payload: "" });
  };

  return (
    <>
      <Dialog {...dialogProps}>
        <Dialog.Content className="w-1/4" blur={true}>
          <div className="flex justify-between items-center">
            <Dialog.Title>Create New Task</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form action={handleSubmit} className="space-y-4 mt-6">
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
                    disabled={{ before: new Date() }}
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

            <SubmitButton className="ml-auto">Create task</SubmitButton>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
