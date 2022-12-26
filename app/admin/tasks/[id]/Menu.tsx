"use client";
import { DialogDemo } from "@components/shared/Dialog";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";

import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";

import type { FormEvent } from "react";

type PropTypes = {
  groupId: number;
};

export function Menu({ groupId }: PropTypes) {
  const [opened, dialogToggle] = useToggle();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    const name = new FormData(e.currentTarget).get("task_name");
    console.log(name);
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, groupId })
      });
      if (res.ok) {
        console.log("success");
        refresh();
        dialogToggle.off();
      }
    } catch (error) {
    } finally {
      toggle.off();
    }
  };
  const isLoading = loading || isPending;
  return (
    <>
      <DialogDemo open={opened} onOpenChange={dialogToggle.set}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Task name" name="task_name" id="task_name" />
          <Button disabled={isLoading}>Create task</Button>
        </form>
      </DialogDemo>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button>
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={dialogToggle.on}>Create task</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
}
