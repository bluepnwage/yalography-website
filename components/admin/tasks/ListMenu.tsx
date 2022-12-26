"use client";
import { DialogDemo } from "@components/shared/Dialog";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@components/shared/client";

import type { FormEvent } from "react";

export function Menu() {
  const [opened, setOpened] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const name = new FormData(e.currentTarget).get("list_name");
      const res = await fetch("/api/task-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        startTransition(() => {
          router.refresh();
          setOpened(false);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const isLoading = loading || isPending;

  return (
    <>
      <DialogDemo title="Create task list" open={opened} onOpenChange={setOpened}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="list_name" id="list_name" />
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
          <Dropdown.Item onClick={() => setOpened(true)}>Create list</Dropdown.Item>
          <Dropdown.Item>Sort by</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
}
