"use client";
//Components
import { DialogDemo } from "@components/shared/Dialog";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";

//Hooks
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";

//Types
import type { FormEvent } from "react";

export function TasksMenu() {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    try {
      const name = new FormData(e.currentTarget).get("task_name");
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggle.off();
    }
  };
  const isLoading = loading || isPending;

  return (
    <>
      <DialogDemo title="Create task" open={dialog} onOpenChange={dialogToggle.set}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="task_name" id="task_name" />
          <Button disabled={isLoading}>Submit</Button>
        </form>
      </DialogDemo>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button aria-label="Open menu">
            <DotsVertical size={16} />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={dialogToggle.on}>Create list</Dropdown.Item>
          <Dropdown.Item>Sort by</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
}
