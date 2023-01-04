"use client";
import { Input } from "@components/shared/Input";
import { Button } from "@components/shared/Button";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import dynamic from "next/dynamic";

const DialogDemo = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.DialogDemo));

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
    const res = await fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    if (res.ok) {
      refresh();
      toggle.off();
    }
  };

  const onLazyLoad = () => {
    if (lazyLoad) return;
    lazyLoadToggle.on();
  };

  const isLoading = isPending || loading;
  return (
    <>
      {lazyLoad && (
        <DialogDemo title="Create a folder" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={onSubmit}>
            <Input className="mb-2" label="Folder name" name="folder_name" id="folder_name" required />
            <Button disabled={isLoading} intent={"accept"}>
              Submit
            </Button>
          </form>
        </DialogDemo>
      )}
      <Button onClick={dialogToggle.on} onMouseEnter={onLazyLoad}>
        Create folder
      </Button>
    </>
  );
}
