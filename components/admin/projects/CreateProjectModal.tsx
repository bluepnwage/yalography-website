"use client";
import { DialogDemo } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";

export function CreateProjectModal() {
  const router = useRouter();
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [dialog, dialogToggle] = useToggle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectName = new FormData(e.currentTarget).get("project_name");
    toggle.on();
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
        dialogToggle.off();
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
      <Button onClick={dialogToggle.on}>Create project</Button>
      <DialogDemo title="Create new project" open={dialog} onOpenChange={dialogToggle.set}>
        <form onSubmit={onSubmit} className="space-y-2">
          <Input label="Project name" name="project_name" required id="project_name" />
          <Button disabled={isLoading} intent="accept">
            Create project
          </Button>
        </form>
      </DialogDemo>
    </>
  );
}
