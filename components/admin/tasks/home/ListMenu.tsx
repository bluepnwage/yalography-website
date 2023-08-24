"use client";
//Components
import { ActionIcon, Button, TextInput, Dialog } from "@aomdev/ui";
//Hooks
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";

import type { FormEvent } from "react";
import { IconX } from "@tabler/icons-react";

export function CreateList() {
  const [dialog, dialogToggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    const name = new FormData(e.currentTarget).get("list_name");
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/task-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
        dialogToggle.off();
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
      <ActionIcon
        onClick={dialogToggle.on}
        onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
        aria-label="Create task list"
        color="success"
      >
        +
      </ActionIcon>

      <Dialog open={dialog} onOpenChange={dialogToggle.set}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title>Create New Task List</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <TextInput autoFocus label="Name" name="list_name" id="list_name" />
            <Button className="block ml-auto" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
