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
import { toast } from "react-toastify";

//Types
import type { FormEvent } from "react";

export function TasksMenu() {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    const name = new FormData(e.currentTarget).get("task_name");
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
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
