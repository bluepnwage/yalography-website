"use client";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@/components/shared/Dialog").then(mod => mod.Dialog));

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
        <Dialog title="Create a folder" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={onSubmit}>
            <Input className="mb-2" label="Folder name" name="folder_name" id="folder_name" required />
            <Button disabled={isLoading} intent={"accept"}>
              Submit
            </Button>
          </form>
        </Dialog>
      )}
      <Button onClick={dialogToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
        Create folder
      </Button>
    </>
  );
}
