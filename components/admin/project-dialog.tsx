"use client";
import { useRouter } from "next/navigation";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { Dialog, Button, TextInput } from "@aomdev/ui";

import type { FormEvent } from "react";
import type { DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

export function ProjectDialog(props: DialogProps) {
  const router = useRouter();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectName = new FormData(e.currentTarget).get("project_name");
    toggle.on();
    const { toast } = await import("react-hot-toast");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/projects/drafted/${json.data.id}`);
        if (props.onOpenChange) props.onOpenChange(false);
      } else {
        throw new Error(json.message, { cause: json.error });
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
      <Dialog {...props}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title>Create new project</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            <TextInput autoFocus label="Project name" name="project_name" required id="project_name" />
            <Button disabled={isLoading} className="block ml-auto">
              Create project
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
