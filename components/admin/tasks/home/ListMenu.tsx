"use client";
//Components
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { ActionIcon } from "@components/shared/ActionIcon";

//Hooks
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));

import type { FormEvent } from "react";

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
        radius={"full"}
        className="h-7 w-7"
        color="emerald"
      >
        +
      </ActionIcon>
      {lazyLoad && (
        <Dialog title="Create task list" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" name="list_name" id="list_name" />
            <Button intent={"accept"} disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Dialog>
      )}
    </>
  );
}
