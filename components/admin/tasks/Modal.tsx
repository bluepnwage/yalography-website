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

import type { FormEvent } from "react";

const taskLists = [
  {
    label: "My name",
    value: "nice"
  },
  {
    label: "Wedding 2019",
    value: "not nice"
  },
  {
    label: "Something 5050",
    value: "bruh"
  }
];

export function Modal() {
  const [opened, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      console.log("success");
      toggle.off();
      refresh();
    } else {
      console.log("Error!!!!!");
    }
  };
  return (
    <DialogDemo trigger={<Button>Create list</Button>} open={opened} onOpenChange={toggle.set}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input name="name" label="Name" />
          {/* <p>
            <label>Task group</label>
            <Select name="task_list" data={taskLists} />
          </p> */}
          <Textarea name="description" label="Description" />
          <Button intent={"accept"}>Submit</Button>
        </div>
      </form>
    </DialogDemo>
  );
}
