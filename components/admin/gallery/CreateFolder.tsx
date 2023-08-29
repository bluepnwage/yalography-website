"use client";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { Button, Dialog, TextInput } from "@aomdev/ui";

import type { FormEvent } from "react";

export function CreateFolder() {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    const name = new FormData(e.currentTarget).get("folder_name");
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/folders", {
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

  const isLoading = isPending || loading;
  return (
    <>
      {lazyLoad && (
        <Dialog open={dialog} onOpenChange={dialogToggle.set}>
          <Dialog.Content blur>
            <Dialog.Title>Create a folder</Dialog.Title>
            <form onSubmit={onSubmit} className="space-y-4 mt-6">
              <TextInput className="mb-2" label="Folder name" name="folder_name" id="folder_name" required />
              <Button disabled={isLoading} className="block ml-auto">
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      <Button onClick={dialogToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
        Create folder
      </Button>
    </>
  );
}
