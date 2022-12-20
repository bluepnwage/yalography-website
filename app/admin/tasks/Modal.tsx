"use client";
import { DialogDemo } from "@components/shared/Dialog";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";
import { Button } from "@components/shared";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [opened, setOpened] = useState(false);
  const router = useRouter()

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
      setOpened(false);
      router.refresh()
    } else {
      console.log("Error!!!!!");
    }
  };
  return (
    <DialogDemo open={opened} onOpenChange={setOpened}>
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