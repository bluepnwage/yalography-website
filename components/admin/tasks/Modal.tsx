"use client";
//Components
import { DialogDemo } from "@components/shared/Dialog";
import { Input } from "@components/shared/Input";
// import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";
import { Button } from "@components/shared/Button";

//Hooks
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { toast } from "react-toastify";

import type { FormEvent } from "react";

export function Modal() {
  const [opened, modalToggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    toggle.on();
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
      } else {
        throw new Error(json.message);
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
    <DialogDemo trigger={<Button>Create Task</Button>} open={opened} onOpenChange={modalToggle.set}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input name="name" label="Name" />
          {/* <p>
            <label>Task group</label>
            <Select name="task_list" data={taskLists} />
          </p> */}
          <Textarea name="description" label="Description" />
          <Button disabled={isLoading} intent={"accept"}>
            Submit
          </Button>
        </div>
      </form>
    </DialogDemo>
  );
}
